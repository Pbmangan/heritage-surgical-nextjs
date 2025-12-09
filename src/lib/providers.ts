// Provider and slot data matching PHP implementation

export interface Provider {
  name: string;
  credentials: string;
  specialty: string;
  location: string;
  address: string;
  phone: string;
  baseTimes: string[];
}

export const providers: Provider[] = [
  {
    name: "Kathryn A Gordon",
    credentials: "NP",
    specialty: "Family Medicine",
    location: "Heritage Surgical - Suite 213",
    address: "3671 Southwestern Blvd., Suite 213",
    phone: "(716)-662-7008",
    baseTimes: ["08:00", "09:00", "09:15", "09:30", "10:30", "11:15", "02:00", "03:15", "03:30", "03:45", "04:00"],
  },
  {
    name: "Kaitlin Dragonette",
    credentials: "NP",
    specialty: "Family Medicine",
    location: "Heritage Surgical - Suite 213",
    address: "3671 Southwestern Blvd., Suite 213",
    phone: "(716)-662-7008",
    baseTimes: ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "10:30", "10:45", "11:00", "11:45"],
  },
  {
    name: "Betsy Mikac",
    credentials: "FNP",
    specialty: "Family Medicine",
    location: "Heritage Surgical - Suite 213",
    address: "3671 Southwestern Blvd., Suite 213",
    phone: "(716)-662-7008",
    baseTimes: ["02:15", "03:00", "03:15", "03:30", "03:45", "04:00"],
  },
  {
    name: "Valerie McDonald",
    credentials: "RPA-C",
    specialty: "Family Medicine",
    location: "Heritage Surgical - Suite 213",
    address: "3671 Southwestern Blvd., Suite 213",
    phone: "(716)-662-7008",
    baseTimes: ["11:30", "12:45", "01:00", "01:15", "02:00", "02:15", "02:30", "03:15", "03:30", "03:45", "04:00"],
  },
];

export interface Slot {
  date: string;
  dateFormatted: string;
  time: string;
  timeFormatted: string;
  provider: Provider;
}

function formatTime12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${String(minutes).padStart(2, '0')} ${period}`;
}

// Simple seeded random number generator for deterministic slot generation
function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

function addMinuteJitter(time: string, rng: () => number): string {
  const [hours, minutes] = time.split(':').map(Number);
  const jitter = Math.floor(rng() * 11) - 5; // -5 to +5 minutes
  let newMinutes = minutes + jitter;
  let newHours = hours;

  if (newMinutes < 0) {
    newMinutes += 60;
    newHours -= 1;
  } else if (newMinutes >= 60) {
    newMinutes -= 60;
    newHours += 1;
  }

  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

export function buildSlots(maxDaysAhead: number = 14): Slot[] {
  const slots: Slot[] = [];
  const today = new Date();
  // Use today's date as the base for stable seed (changes daily but consistent within a day)
  const baseSeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  for (let providerIndex = 0; providerIndex < providers.length; providerIndex++) {
    const provider = providers[providerIndex];

    // Create a deterministic RNG seeded by provider index and base date
    const providerSeed = baseSeed * 100 + providerIndex;
    const rng = seededRandom(providerSeed);

    // Generate slots for each day in the range (1 to maxDaysAhead)
    for (let daysOffset = 1; daysOffset <= maxDaysAhead; daysOffset++) {
      // Use deterministic check for whether this provider has slots on this day
      // Each provider-day combo gets a consistent seed
      const daySeed = providerSeed * 100 + daysOffset;
      const dayRng = seededRandom(daySeed);

      // ~60% chance provider has slots on any given day
      if (dayRng() > 0.6) continue;

      const date = new Date(today);
      date.setDate(date.getDate() + daysOffset);

      const dateStr = date.toISOString().split('T')[0];
      const dateFormatted = date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      // Pick 3-6 random times from base times deterministically
      const numTimes = 3 + Math.floor(dayRng() * 4);
      const shuffledTimes = [...provider.baseTimes].sort(() => dayRng() - 0.5);
      const selectedTimes = shuffledTimes.slice(0, Math.min(numTimes, provider.baseTimes.length));

      // Sort selected times
      selectedTimes.sort();

      for (const baseTime of selectedTimes) {
        const time = addMinuteJitter(baseTime, dayRng);
        slots.push({
          date: dateStr,
          dateFormatted,
          time,
          timeFormatted: formatTime12Hour(time),
          provider,
        });
      }
    }
  }

  // Sort by date, then provider, then time
  return slots.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    const providerCompare = a.provider.name.localeCompare(b.provider.name);
    if (providerCompare !== 0) return providerCompare;
    return a.time.localeCompare(b.time);
  });
}

export interface GroupedSlots {
  date: string;
  dateFormatted: string;
  providers: {
    provider: Provider;
    slots: Slot[];
  }[];
}

export function groupSlotsByDateAndProvider(slots: Slot[]): GroupedSlots[] {
  const grouped: Map<string, Map<string, Slot[]>> = new Map();

  for (const slot of slots) {
    if (!grouped.has(slot.date)) {
      grouped.set(slot.date, new Map());
    }
    const dateGroup = grouped.get(slot.date)!;
    const providerKey = `${slot.provider.name} ${slot.provider.credentials}`;
    if (!dateGroup.has(providerKey)) {
      dateGroup.set(providerKey, []);
    }
    dateGroup.get(providerKey)!.push(slot);
  }

  const result: GroupedSlots[] = [];
  const sortedDates = Array.from(grouped.keys()).sort();

  for (const date of sortedDates) {
    const dateGroup = grouped.get(date)!;
    const firstSlotForDate = slots.find(s => s.date === date);

    const providers: GroupedSlots['providers'] = [];
    const sortedProviders = Array.from(dateGroup.keys()).sort();

    for (const providerKey of sortedProviders) {
      const providerSlots = dateGroup.get(providerKey)!;
      providerSlots.sort((a, b) => a.time.localeCompare(b.time));
      providers.push({
        provider: providerSlots[0].provider,
        slots: providerSlots,
      });
    }

    result.push({
      date,
      dateFormatted: firstSlotForDate?.dateFormatted || date,
      providers,
    });
  }

  return result;
}

export function getUniqueDates(slots: Slot[]): string[] {
  return Array.from(new Set(slots.map(s => s.date))).sort();
}

export function getUniqueLocations(slots: Slot[]): string[] {
  return Array.from(new Set(slots.map(s => s.provider.location))).sort();
}
