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
    name: "Lauren Mockwell",
    credentials: "PA",
    specialty: "Orthopedic Surgery",
    location: "Heritage Surgical - Main Campus",
    address: "1200 Medical Center Dr, Suite 400",
    phone: "(555) 234-5678",
    baseTimes: ["08:00", "09:30", "11:00", "13:30", "15:00", "16:30"],
  },
  {
    name: "Kathryn Gordonette",
    credentials: "NP",
    specialty: "Sports Medicine",
    location: "Heritage Surgical - North Clinic",
    address: "800 Healthcare Blvd, Building B",
    phone: "(555) 345-6789",
    baseTimes: ["07:30", "09:00", "10:30", "14:00", "15:30", "17:00"],
  },
  {
    name: "Kaitlin Dragonnette",
    credentials: "NP",
    specialty: "Joint Replacement",
    location: "Heritage Surgical - South Office",
    address: "2500 Wellness Way, Floor 2",
    phone: "(555) 456-7890",
    baseTimes: ["08:30", "10:00", "11:30", "13:00", "14:30", "16:00"],
  },
  {
    name: "Valerie McDonald",
    credentials: "RPA-C",
    specialty: "Spine Surgery",
    location: "Heritage Surgical - Main Campus",
    address: "1200 Medical Center Dr, Suite 410",
    phone: "(555) 567-8901",
    baseTimes: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
  },
];

export interface Slot {
  date: string;
  dateFormatted: string;
  time: string;
  provider: Provider;
}

function addMinuteJitter(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const jitter = Math.floor(Math.random() * 11) - 5; // -5 to +5 minutes
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

export function buildSlots(): Slot[] {
  const slots: Slot[] = [];
  const today = new Date();

  for (const provider of providers) {
    // Generate 4 random dates 1-6 days in the future
    const daysAhead = new Set<number>();
    while (daysAhead.size < 4) {
      daysAhead.add(1 + Math.floor(Math.random() * 6));
    }

    for (const days of daysAhead) {
      const date = new Date(today);
      date.setDate(date.getDate() + days);

      const dateStr = date.toISOString().split('T')[0];
      const dateFormatted = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });

      // Pick 2-3 random times from base times
      const numTimes = 2 + Math.floor(Math.random() * 2);
      const shuffledTimes = [...provider.baseTimes].sort(() => Math.random() - 0.5);
      const selectedTimes = shuffledTimes.slice(0, numTimes);

      for (const baseTime of selectedTimes) {
        const time = addMinuteJitter(baseTime);
        slots.push({
          date: dateStr,
          dateFormatted,
          time,
          provider,
        });
      }
    }
  }

  // Sort by date, then time
  return slots.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });
}

export function getUniqueDates(slots: Slot[]): string[] {
  return [...new Set(slots.map(s => s.date))].sort();
}

export function getUniqueLocations(slots: Slot[]): string[] {
  return [...new Set(slots.map(s => s.provider.location))].sort();
}
