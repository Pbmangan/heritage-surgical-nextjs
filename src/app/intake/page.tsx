'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import LegacyProgress from '@/components/LegacyProgress';

export default function IntakePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [painLevel, setPainLevel] = useState(5);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors([]);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        router.push(`/intake/success?email=${encodeURIComponent(result.emailStatus)}`);
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
      <h2 className="page-title">New Patient Intake Form</h2>

      <div className="callout-box">
        <strong>📋 Important:</strong> Please complete this form at least 48 hours
        before your scheduled appointment. All fields marked with * are required.
      </div>

      <LegacyProgress />

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
          <legend>Contact Information</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="full_name">Full Name *</label>
              <input type="text" id="full_name" name="full_name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="location">Preferred Location</label>
              <select id="location" name="location">
                <option value="">-- Select Location --</option>
                <option value="main">Main Campus</option>
                <option value="north">North Clinic</option>
                <option value="south">South Office</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="surgeon">Preferred Surgeon</label>
              <select id="surgeon" name="surgeon">
                <option value="">-- No Preference --</option>
                <option value="heritage">Dr. Robert Heritage</option>
                <option value="mitchell">Dr. Sarah Mitchell</option>
                <option value="wong">Dr. James Wong</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="surgery_date">Surgery/Appointment Date</label>
              <input type="date" id="surgery_date" name="surgery_date" />
            </div>
            <div className="form-group">
              <label htmlFor="surgery_time">Appointment Time</label>
              <input type="time" id="surgery_time" name="surgery_time" />
            </div>
          </div>
        </fieldset>

        <fieldset className="legend-old">
          <legend>Chief Complaint &amp; Medical History</legend>
          <div className="form-group">
            <label htmlFor="main_issue">What is your main issue or concern? *</label>
            <textarea
              id="main_issue"
              name="main_issue"
              required
              placeholder="Please describe the body part affected and your symptoms..."
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="days_since">Days since symptoms started</label>
              <input type="number" id="days_since" name="days_since" min="0" />
            </div>
            <div className="form-group">
              <label>Pain Level (1-10): {painLevel}</label>
              <input
                type="range"
                name="pain_level"
                min="1"
                max="10"
                value={painLevel}
                onChange={(e) => setPainLevel(parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Does this interfere with: (check all that apply)</label>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" name="interfere" value="walking" />
                Walking
              </label>
              <label>
                <input type="checkbox" name="interfere" value="stairs" />
                Climbing stairs
              </label>
              <label>
                <input type="checkbox" name="interfere" value="driving" />
                Driving
              </label>
              <label>
                <input type="checkbox" name="interfere" value="work" />
                Work
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="length_of_symptoms">How long have you had these symptoms?</label>
            <textarea
              id="length_of_symptoms"
              name="length_of_symptoms"
              placeholder="e.g., 3 months, since last year, after an injury..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="interventions">What treatments have you already tried?</label>
            <textarea
              id="interventions"
              name="interventions"
              placeholder="e.g., physical therapy, medications, injections..."
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="imaging">Previous Imaging</label>
              <select id="imaging" name="imaging">
                <option value="">-- Select --</option>
                <option value="none">None</option>
                <option value="xray">X-Ray</option>
                <option value="mri">MRI</option>
                <option value="ct">CT Scan</option>
                <option value="ultrasound">Ultrasound</option>
                <option value="multiple">Multiple types</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="imaging_results">Imaging Results (if known)</label>
            <textarea
              id="imaging_results"
              name="imaging_results"
              placeholder="Please describe any findings from your imaging studies..."
            />
          </div>

          <div className="form-group">
            <label>Have you had previous surgery on this area?</label>
            <div className="checkbox-group">
              <label>
                <input type="radio" name="previous_surgery" value="yes" />
                Yes
              </label>
              <label>
                <input type="radio" name="previous_surgery" value="no" defaultChecked />
                No
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="surgery_details">If yes, please describe previous surgeries</label>
            <textarea
              id="surgery_details"
              name="surgery_details"
              placeholder="Surgery type, date, and outcome..."
            />
          </div>
        </fieldset>

        <fieldset className="legend-old">
          <legend>Pre-Operative &amp; Day-Of Information</legend>

          <div className="form-group">
            <label htmlFor="arrival_time">Preferred arrival time (if applicable)</label>
            <textarea
              id="arrival_time"
              name="arrival_time"
              placeholder="Any preferences for arrival time..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="iv_and_prep">IV/Prep concerns or preferences</label>
            <textarea
              id="iv_and_prep"
              name="iv_and_prep"
              placeholder="Any concerns about IVs, sedation, or preparation..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="anesthesia_questions">Anesthesia questions or concerns</label>
            <textarea
              id="anesthesia_questions"
              name="anesthesia_questions"
              placeholder="Previous anesthesia experiences, allergies, concerns..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="postop_notes">Post-operative information interests</label>
            <textarea
              id="postop_notes"
              name="postop_notes"
              placeholder="What post-op information would be helpful to know..."
            />
          </div>
        </fieldset>

        <fieldset className="legend-old">
          <legend>Verification</legend>
          <div className="note-block">
            <p>
              By submitting this form, I certify that the information provided is
              accurate to the best of my knowledge. I understand that this form does
              not establish a patient-provider relationship and that I will need to
              schedule an appointment for evaluation.
            </p>
          </div>
          <div className="form-group" style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '11px', color: '#666' }}>
              [reCAPTCHA verification placeholder - would appear here in production]
            </p>
          </div>
        </fieldset>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Submitting... Please wait...' : 'Submit Intake Form'}
          </button>
        </div>

        {submitting && (
          <p className="loading-text">
            Processing your submission... This may take a moment due to server load.
          </p>
        )}
      </form>
    </main>
  );
}
