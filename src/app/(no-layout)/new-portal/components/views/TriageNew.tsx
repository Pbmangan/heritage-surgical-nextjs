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
  { id: 'NURSETRIAGE', name: 'Nurse Triage' },
  { id: 'SVCPATIENT', name: 'Services , Patient' },
  { id: 'NURSINGTRIAGE', name: 'Nursing, Triage' },
  { id: 'WFSZNJ7W', name: 'Clark Street Health' },
  { id: 'JSMITH01', name: 'John Smith' },
  { id: 'MJONES02', name: 'Mary Jones' },
  { id: 'RBROWN03', name: 'Robert Brown' },
  { id: 'SWILSON04', name: 'Sarah Wilson' },
];

// Reason code suggestions for autocomplete
const reasonSuggestions = [
  { code: 'Urgent', description: 'Urgent Triage' },
  { code: 'Urgentcare', description: 'Urgent Care Tracking' },
  { code: 'Rx Live', description: 'pharmacy' },
  { code: 'Rx Refill', description: 'Rx Refill' },
  { code: '<none>', description: '' },
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
  const [userFilter, setUserFilter] = useState('');
  const [status, setStatus] = useState('Open');
  const [reason, setReason] = useState('');
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const [rating, setRating] = useState('1 Normal');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter users based on input
  const filteredUsers = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(userFilter.toLowerCase())
  );

  // Filter reason suggestions based on input
  const filteredReasons = reasonSuggestions.filter((r) =>
    r.code.toLowerCase().includes(reason.toLowerCase()) ||
    r.description.toLowerCase().includes(reason.toLowerCase())
  );

  const handleUserSelect = (selectedUser: typeof mockUsers[0]) => {
    setUser(selectedUser.name);
    setUserFilter(selectedUser.name);
    setShowUserDropdown(false);
  };

  const handleReasonSelect = (selectedReason: typeof reasonSuggestions[0]) => {
    const displayValue = selectedReason.description
      ? `${selectedReason.code} - ${selectedReason.description}`
      : selectedReason.code;
    setReason(displayValue);
    setShowReasonDropdown(false);
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
        <form id="triage_detail_form" name="triage_detail_form">
          {/* Route Section */}
          <div className="sectionBanner">Route</div>
          <div className="twoColumnText">
            {/* Column A - User and Reason */}
            <div className="columnA">
              <div id="triage_user_div" className="ccs_lookup_field_group">
                <label htmlFor="triage_user" className="ccs_lookup_field_label">User</label>
                <input
                  type="text"
                  id="triage_user"
                  name="triage_user"
                  className="ccs_lookup_field_input"
                  autoComplete="off"
                  value={userFilter}
                  onChange={(e) => {
                    setUserFilter(e.target.value);
                    setUser(e.target.value);
                    setShowUserDropdown(true);
                  }}
                  onFocus={() => setShowUserDropdown(true)}
                  onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
                />
                {showUserDropdown && filteredUsers.length > 0 && (
                  <div id="triage_user_hints" className="ajax_hints triage-user-dropdown-visible">
                    {filteredUsers.map((u) => (
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

              <div id="triage_reason_div" className="ccs_lookup_field_group">
                <label htmlFor="triage_reason" className="ccs_lookup_field_label">Reason</label>
                <input
                  type="text"
                  id="triage_reason"
                  name="triage_reason"
                  className="ccs_lookup_field_input"
                  autoComplete="off"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                    setShowReasonDropdown(true);
                  }}
                  onFocus={() => setShowReasonDropdown(true)}
                  onBlur={() => setTimeout(() => setShowReasonDropdown(false), 200)}
                />
                {showReasonDropdown && filteredReasons.length > 0 && (
                  <div id="triage_reason_hints" className="ajax_hints triage-user-dropdown-visible">
                    {filteredReasons.map((r, index) => (
                      <div
                        key={index}
                        className="triage-user-option"
                        onClick={() => handleReasonSelect(r)}
                      >
                        {r.description ? `${r.code} - ${r.description}` : r.code}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Column B - Status and Rating */}
            <div className="columnB">
              <div id="triage_status_div" className="ccs_lookup_field_group">
                <label htmlFor="triage_status" className="ccs_lookup_field_label">Status</label>
                <select
                  id="triage_status"
                  name="triage_status"
                  className="ccs_lookup_field_select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div id="triage_rating_div" className="ccs_lookup_field_group">
                <label htmlFor="triage_rating" className="ccs_lookup_field_label">Rating</label>
                <select
                  id="triage_rating"
                  name="triage_rating"
                  className="ccs_lookup_field_select"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="1 Normal">1 Normal</option>
                  <option value="2 Priority">2 Priority</option>
                  <option value="3 Urgent">3 Urgent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subject & Message Section */}
          <div className="sectionBanner">Subject &amp; Message</div>
          <div>
            <div id="triage_subject_div">
              <input
                type="text"
                id="triage_subject"
                name="triage_subject"
                className="ccs_lookup_field_input"
                maxLength={80}
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div id="triage_message_div" className="ccs_lookup_field_group">
              <textarea
                id="triage_message"
                name="triage_message"
                className="ccs_lookup_field_textarea"
                rows={3}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>

          {/* Hidden fields for compatibility */}
          <div id="triage_hidden_fields" style={{ display: 'none' }}>
            <input type="hidden" id="form_name" name="form_name" value="triage_detail_form" />
            <input type="hidden" id="triage_id" name="triage_id" value="0" />
            <input type="hidden" id="iPatient" value={patient.id} />
            <input type="hidden" id="iIsDependent" value="0" />
            <input type="hidden" id="sName" value={`${patient.firstName} ${patient.lastName}`} />
            <input type="hidden" id="sGender" value={patient.gender} />
            <input type="hidden" id="sDob" value={patient.dob} />
            <input type="hidden" id="sAge" value={`${patient.age} yrs`} />
          </div>
        </form>
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
