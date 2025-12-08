'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ScheduleStep3Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [noInsurance, setNoInsurance] = useState(false);

  // Slot info from step 2
  const slotDate = searchParams.get('slot_date') || '';
  const slotTime = searchParams.get('slot_time') || '';
  const slotProvider = searchParams.get('slot_provider') || '';
  const slotCredentials = searchParams.get('slot_credentials') || '';
  const slotSpecialty = searchParams.get('slot_specialty') || '';
  const slotLocation = searchParams.get('slot_location') || '';
  const slotAddress = searchParams.get('slot_address') || '';
  const slotPhone = searchParams.get('slot_phone') || '';

  // Previous selections
  const serviceLine = searchParams.get('service_line') || '';
  const newPatient = searchParams.get('new_patient') || '';
  const visitReason = searchParams.get('visit_reason') || '';
  const dayFilter = searchParams.get('day_filter') || '';
  const providerFilter = searchParams.get('provider_filter') || '';
  const locationFilter = searchParams.get('location_filter') || '';

  // Generate years and days for DOB
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);

    const formData = new FormData(e.currentTarget);

    // Add slot info to form data
    formData.set('slot_date', slotDate);
    formData.set('slot_time', slotTime);
    formData.set('slot_provider', slotProvider);
    formData.set('slot_credentials', slotCredentials);
    formData.set('slot_specialty', slotSpecialty);
    formData.set('slot_location', slotLocation);
    formData.set('slot_address', slotAddress);
    formData.set('slot_phone', slotPhone);
    formData.set('service_line', serviceLine);
    formData.set('new_patient', newPatient);
    formData.set('visit_reason', visitReason);
    formData.set('day_filter', dayFilter);
    formData.set('provider_filter', providerFilter);
    formData.set('location_filter', locationFilter);

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        router.push(`/schedule/success?${new URLSearchParams({
          provider: slotProvider,
          credentials: slotCredentials,
          date: slotDate,
          time: slotTime,
          location: slotLocation,
          email: result.emailStatus,
        }).toString()}`);
      } else {
        setErrors(result.errors || ['An error occurred']);
        setSubmitting(false);
      }
    } catch {
      setErrors(['Network error. Please try again.']);
      setSubmitting(false);
    }
  };

  return (
    <main className="container">
      <h2 className="page-title">Patient Information - Step 3 of 3</h2>

      <div className="scheduler-section" style={{ marginBottom: '20px' }}>
        <h3>Selected Appointment</h3>
        <p>
          <strong>Provider:</strong> {slotProvider}, {slotCredentials}<br />
          <strong>Specialty:</strong> {slotSpecialty}<br />
          <strong>Date/Time:</strong> {slotDate} at {slotTime}<br />
          <strong>Location:</strong> {slotLocation}<br />
          <span style={{ fontSize: '12px', color: '#666' }}>{slotAddress} | {slotPhone}</span>
        </p>
      </div>

      {errors.length > 0 && (
        <div className="error-message">
          <strong>Please correct the following errors:</strong>
          <ul className="error-list">
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className={submitting ? 'loading' : ''}>
        <fieldset className="legend-old">
          <legend>Patient Information</legend>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="first_name">First Name *</label>
              <input type="text" id="first_name" name="first_name" required />
            </div>
            <div className="form-group">
              <label htmlFor="last_name">Last Name *</label>
              <input type="text" id="last_name" name="last_name" required />
            </div>
          </div>

          <div className="form-group">
            <label>Date of Birth *</label>
            <div className="dob-row">
              <select name="dob_month" required>
                <option value="">Month</option>
                {months.map((month, i) => (
                  <option key={month} value={i + 1}>{month}</option>
                ))}
              </select>
              <select name="dob_day" required>
                <option value="">Day</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select name="dob_year" required>
                <option value="">Year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" required />
            </div>
          </div>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="email_opt_in"
                value="yes"
              />
              {' '}Yes, I would like to receive appointment reminders via email
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="carrier">Mobile Carrier (for SMS reminders)</label>
            <select id="carrier" name="carrier">
              <option value="">-- Select Carrier --</option>
              <option value="att">AT&T</option>
              <option value="verizon">Verizon</option>
              <option value="tmobile">T-Mobile</option>
              <option value="googlefi">Google Fi</option>
              <option value="other">Other</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="legend-old">
          <legend>Insurance Information</legend>

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="no_insurance"
                value="yes"
                checked={noInsurance}
                onChange={(e) => setNoInsurance(e.target.checked)}
              />
              {' '}I do not have insurance / Self-pay
            </label>
          </div>

          {!noInsurance && (
            <>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="insurance_name">Insurance Company *</label>
                  <input
                    type="text"
                    id="insurance_name"
                    name="insurance_name"
                    required={!noInsurance}
                    placeholder="e.g., Blue Cross Blue Shield"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="plan_name">Plan Name *</label>
                  <input
                    type="text"
                    id="plan_name"
                    name="plan_name"
                    required={!noInsurance}
                    placeholder="e.g., PPO Gold"
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="subscriber_id">Subscriber ID *</label>
                  <input
                    type="text"
                    id="subscriber_id"
                    name="subscriber_id"
                    required={!noInsurance}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="group_number">Group Number *</label>
                  <input
                    type="text"
                    id="group_number"
                    name="group_number"
                    required={!noInsurance}
                  />
                </div>
              </div>
            </>
          )}

          <div className="note-block">
            <strong>Note:</strong> Please bring your insurance card to your appointment.
            Co-pays are due at time of service. For self-pay patients, please call
            our billing department at ext. 200 for pricing information.
          </div>
        </fieldset>

        <fieldset className="legend-old">
          <legend>Reason for Visit</legend>

          <div className="form-group">
            <label htmlFor="reason_details">Please describe your reason for this visit *</label>
            <textarea
              id="reason_details"
              name="reason_details"
              required
              placeholder="Briefly describe your symptoms or reason for appointment..."
              style={{ minHeight: '100px' }}
            />
          </div>
        </fieldset>

        <div className="warning">
          <strong>⚠️ Cancellation Policy:</strong> Please provide at least 24 hours
          notice if you need to cancel or reschedule. Missed appointments without
          notice may be subject to a $50 fee.
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => router.back()}
            style={{ marginRight: '10px' }}
          >
            ← Back
          </button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Scheduling... Please wait...' : 'Confirm Appointment'}
          </button>
        </div>

        {submitting && (
          <p className="loading-text">
            Processing your appointment request... This may take a moment.
          </p>
        )}
      </form>
    </main>
  );
}
