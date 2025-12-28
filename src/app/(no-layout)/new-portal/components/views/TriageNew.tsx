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

// Mock users for dropdown
const mockUsers = [
  { id: 'WFSZNJ7W', name: 'Clark Street Health' },
  { id: 'JSMITH01', name: 'John Smith' },
  { id: 'MJONES02', name: 'Mary Jones' },
  { id: 'RBROWN03', name: 'Robert Brown' },
  { id: 'SWILSON04', name: 'Sarah Wilson' },
];

export default function TriageNew({
  patient,
  userName,
  navigate,
  goBack,
  goHome,
  onLogout,
}: TriageNewProps) {
  const [user, setUser] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [status, setStatus] = useState('Open');
  const [reason, setReason] = useState('');
  const [rating, setRating] = useState('1 Normal');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUserSelect = (selectedUser: typeof mockUsers[0]) => {
    setUser(selectedUser.name);
    setShowUserDropdown(false);
  };

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
          <div className="triage-route-row">
            <div className="triage-route-cell triage-route-cell-input triage-route-cell-clickable">
              <label>User</label>
              <div
                className="triage-user-select"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                id="triageUser"
              >
                {user || <span className="triage-placeholder">&nbsp;</span>}
              </div>
              {showUserDropdown && (
                <div className="triage-user-dropdown">
                  {mockUsers.map((u) => (
                    <div
                      key={u.id}
                      className="triage-user-option"
                      onClick={() => handleUserSelect(u)}
                      data-user-id={u.id}
                    >
                      {u.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="triage-route-cell triage-route-cell-value">
              <label>Status</label>
              <span>{status}</span>
            </div>
          </div>
          <div className="triage-route-row">
            <div className="triage-route-cell triage-route-cell-input">
              <label>Reason</label>
              <input
                type="text"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                id="triageReason"
                name="triageReason"
              />
            </div>
            <div className="triage-route-cell triage-route-cell-value">
              <label>Rating</label>
              <span>{rating}</span>
            </div>
          </div>
        </div>

        {/* Subject & Message Section */}
        <div className="triage-section-header triage-section-route">Subject &amp; Message</div>
        <div className="triage-form-section">
          <div className="triage-message-row">
            <label>Subject</label>
          </div>
          <div className="triage-message-row triage-message-input">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              id="triageSubject"
              name="triageSubject"
            />
          </div>
          <div className="triage-message-row">
            <label>Message</label>
          </div>
          <div className="triage-message-row triage-message-textarea">
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
