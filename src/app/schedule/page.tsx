'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SchedulePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    params.set('service_line', formData.get('service_line') as string || '');
    params.set('new_patient', formData.get('new_patient') as string || '');
    params.set('visit_reason', formData.get('visit_reason_select') as string || '');

    // Simulate legacy delay
    setTimeout(() => {
      router.push(`/schedule/step2?${params.toString()}`);
    }, 500 + Math.random() * 500);
  };

  return (
    <main className="container">
      <h2 className="page-title">Schedule an Appointment - Step 1 of 3</h2>

      <div className="callout-box">
        <strong>📅 Online Scheduling:</strong> Select your clinic and visit type below
        to see available appointment times.
      </div>

      <div className="note-block">
        <strong>Note:</strong> Online scheduling is available for routine appointments only.
        For urgent matters or surgical scheduling, please call (555) 123-4567.
      </div>

      <form onSubmit={handleSubmit} className={submitting ? 'loading' : ''}>
        <fieldset className="legend-old">
          <legend>Appointment Details</legend>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="service_line">Select Clinic *</label>
              <select id="service_line" name="service_line" required>
                <option value="">-- Select Clinic --</option>
                <option value="heritage_surgical">Heritage Surgical</option>
                <option value="heritage_aesthetics">Heritage Aesthetics</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="new_patient">Are you a new patient? *</label>
              <select id="new_patient" name="new_patient" required>
                <option value="">-- Select --</option>
                <option value="yes">Yes - New Patient</option>
                <option value="no">No - Established Patient</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="visit_reason_select">Reason for Visit *</label>
              <select id="visit_reason_select" name="visit_reason_select" required>
                <option value="">-- Select Reason --</option>
                <option value="annual_wellness">Annual Wellness Exam</option>
                <option value="follow_up">Follow Up Visit</option>
                <option value="injury_consult">Injury Consultation</option>
                <option value="post_op">Post-Op Recheck</option>
              </select>
            </div>
          </div>
        </fieldset>

        <div className="warning">
          <strong>⚠️ Insurance Verification:</strong> Please have your insurance
          information ready for step 3. We will verify coverage before finalizing
          your appointment.
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Loading availability...' : 'Continue to Select Time →'}
          </button>
        </div>

        {submitting && (
          <p className="loading-text">
            Checking appointment availability... Please wait.
          </p>
        )}
      </form>
    </main>
  );
}
