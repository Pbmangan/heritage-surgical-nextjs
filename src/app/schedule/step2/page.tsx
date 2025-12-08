'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { buildSlots, getUniqueDates, getUniqueLocations, groupSlotsByDateAndProvider, Slot } from '@/lib/providers';
import LegacyProgress from '@/components/LegacyProgress';

function ScheduleStep2Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [dayFilter, setDayFilter] = useState('all');
  const [providerFilter, setProviderFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const serviceLine = searchParams.get('service_line') || '';
  const newPatient = searchParams.get('new_patient') || '';
  const visitReason = searchParams.get('visit_reason') || '';

  useEffect(() => {
    // Simulate server delay
    const delay = 800 + Math.random() * 1200;
    const timer = setTimeout(() => {
      setSlots(buildSlots());
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  const uniqueDates = useMemo(() => getUniqueDates(slots), [slots]);
  const uniqueLocations = useMemo(() => getUniqueLocations(slots), [slots]);
  const uniqueProviders = useMemo(() => {
    const names = Array.from(new Set(slots.map(s => `${s.provider.name} ${s.provider.credentials}`)));
    return names.sort();
  }, [slots]);

  const filteredSlots = useMemo(() => {
    return slots.filter(slot => {
      if (dayFilter !== 'all' && slot.date !== dayFilter) return false;
      if (providerFilter !== 'all' && `${slot.provider.name} ${slot.provider.credentials}` !== providerFilter) return false;
      if (locationFilter !== 'all' && slot.provider.location !== locationFilter) return false;
      return true;
    });
  }, [slots, dayFilter, providerFilter, locationFilter]);

  const groupedSlots = useMemo(() => groupSlotsByDateAndProvider(filteredSlots), [filteredSlots]);

  const handleSelectSlot = (slot: Slot) => {
    const params = new URLSearchParams();
    params.set('service_line', serviceLine);
    params.set('new_patient', newPatient);
    params.set('visit_reason', visitReason);
    params.set('slot_date', slot.date);
    params.set('slot_time', slot.timeFormatted);
    params.set('slot_provider', slot.provider.name);
    params.set('slot_credentials', slot.provider.credentials);
    params.set('slot_specialty', slot.provider.specialty);
    params.set('slot_location', slot.provider.location);
    params.set('slot_address', slot.provider.address);
    params.set('slot_phone', slot.provider.phone);
    params.set('day_filter', dayFilter);
    params.set('provider_filter', providerFilter);
    params.set('location_filter', locationFilter);

    setLoading(true);
    setTimeout(() => {
      router.push(`/schedule/step3?${params.toString()}`);
    }, 400 + Math.random() * 400);
  };

  return (
    <main className="container">
      <h2 className="page-title">Select Appointment Time - Step 2 of 3</h2>

      <div className="callout-box">
        <strong>📅 Available Appointments:</strong> Use the filters below to find a
        convenient time. Click a time slot to continue.
      </div>

      {loading ? (
        <>
          <LegacyProgress />
          <p className="loading-text">Loading available appointments... Please wait.</p>
        </>
      ) : (
        <>
          <div className="filter-row">
            <div className="form-group">
              <label htmlFor="day_filter">Filter by Date</label>
              <select
                id="day_filter"
                value={dayFilter}
                onChange={(e) => setDayFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                {uniqueDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="provider_filter">Filter by Provider</label>
              <select
                id="provider_filter"
                value={providerFilter}
                onChange={(e) => setProviderFilter(e.target.value)}
              >
                <option value="all">All Providers</option>
                {uniqueProviders.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="location_filter">Filter by Location</label>
              <select
                id="location_filter"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              >
                <option value="all">All Locations</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="scheduler-section">
            {filteredSlots.length === 0 ? (
              <div className="warning">
                No appointments match your filters. Try adjusting your criteria or
                call (555) 123-4567 for additional options.
              </div>
            ) : (
              <div className="schedule-list">
                {groupedSlots.map((dateGroup) => (
                  <div key={dateGroup.date} className="date-group">
                    <div className="date-header">
                      {dateGroup.dateFormatted}
                    </div>
                    {dateGroup.providers.map((providerGroup, idx) => (
                      <div key={idx} className="provider-row">
                        <div className="provider-avatar">
                          <div className="avatar-placeholder" />
                        </div>
                        <div className="provider-info">
                          <div className="provider-name">
                            {providerGroup.provider.name.toUpperCase()}, {providerGroup.provider.credentials}
                          </div>
                          <div className="provider-details">
                            {providerGroup.provider.location}<br />
                            {providerGroup.provider.address}<br />
                            {providerGroup.provider.phone}
                          </div>
                        </div>
                        <div className="time-slots">
                          {providerGroup.slots.map((slot, slotIdx) => (
                            <button
                              key={slotIdx}
                              className="time-slot-btn"
                              onClick={() => handleSelectSlot(slot)}
                            >
                              {slot.timeFormatted}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="note-block">
            <strong>Note:</strong> Appointment times shown are approximate. Actual wait
            times may vary. Please arrive 15 minutes before your scheduled time.
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              className="btn-secondary"
              onClick={() => router.back()}
            >
              ← Back to Step 1
            </button>
          </div>
        </>
      )}
    </main>
  );
}

export default function ScheduleStep2Page() {
  return (
    <Suspense fallback={
      <main className="container">
        <h2 className="page-title">Select Appointment Time - Step 2 of 3</h2>
        <LegacyProgress />
        <p className="loading-text">Loading...</p>
      </main>
    }>
      <ScheduleStep2Content />
    </Suspense>
  );
}
