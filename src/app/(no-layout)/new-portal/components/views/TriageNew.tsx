'use client';

import { useState } from 'react';
import PortalHeader, { getTriageNewHeader } from '../PortalHeader';
import PortalFooter from '../PortalFooter';
import PatientBanner from '../PatientBanner';
import { Patient, ViewState } from '../../types';

interface TriageNewProps {
  patient: Patient;
  userName: string;
  navigate: (view: ViewState) => void;
  goBack: () => void;
  goHome: () => void;
  onLogout: () => void;
}

export default function TriageNew({
  patient,
  userName,
  navigate,
  goBack,
  goHome,
  onLogout,
}: TriageNewProps) {
  const [user, setUser] = useState('');
  const [status, setStatus] = useState('Open');
  const [reason, setReason] = useState('');
  const [rating, setRating] = useState('1 Normal');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/new-portal/api/triage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientName: `${patient.firstName} ${patient.lastName}`,
          patientDob: patient.dob,
          patientId: patient.id,
          user,
          status,
          reason,
          rating,
          subject,
          message,
          submittedBy: userName,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const emailMsg = result.emailStatus === 'sent'
          ? 'Email notification sent successfully.'
          : 'Note: Email notification could not be sent.';
        alert(`Triage entry saved for ${patient.firstName} ${patient.lastName}.\n\n${emailMsg}`);
        goBack();
      } else {
        alert(`Error saving triage: ${result.error}`);
      }
    } catch (error) {
      alert(`Error submitting triage: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    goBack();
  };

  const handlePortal = () => {
    alert('Portal - Not implemented');
  };

  const handleCloseExit = () => {
    goBack();
  };

  const handleRefEmail = () => {
    alert('Ref Email - Not implemented');
  };

  const handleRefTriage = () => {
    alert('Ref Triage - Not implemented');
  };

  return (
    <div className="portal-container">
      {isSubmitting && (
        <div className="triage-loading-overlay">
          <div className="triage-loading-spinner"></div>
          <div>Submitting triage...</div>
        </div>
      )}

      <PortalHeader
        buttons={getTriageNewHeader(
          handleSubmit,
          handleCancel,
          handlePortal,
          handleCloseExit,
          handleRefEmail,
          handleRefTriage,
          goHome
        )}
      />

      <PatientBanner patient={patient} />

      <div className="portal-content">
        {/* Route Section */}
        <div className="triage-section-header triage-section-route">Route</div>
        <div className="triage-form-section">
          <div className="triage-form-row triage-form-row-split">
            <div className="triage-form-field">
              <label>User</label>
              <input
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                id="triageUser"
                name="triageUser"
              />
            </div>
            <div className="triage-form-field">
              <label>Status</label>
              <div className="triage-form-value">{status}</div>
            </div>
          </div>
          <div className="triage-form-row triage-form-row-split">
            <div className="triage-form-field">
              <label>Reason</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                id="triageReason"
                name="triageReason"
              />
            </div>
            <div className="triage-form-field">
              <label>Rating</label>
              <div className="triage-form-value">{rating}</div>
            </div>
          </div>
        </div>

        {/* Subject & Message Section */}
        <div className="triage-section-header triage-section-route">Subject &amp; Message</div>
        <div className="triage-form-section">
          <div className="triage-form-row">
            <label>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              id="triageSubject"
              name="triageSubject"
            />
          </div>
          <div className="triage-form-row">
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="triageMessage"
              name="triageMessage"
              rows={4}
            />
          </div>
        </div>
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
