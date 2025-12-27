'use client';

import { useState } from 'react';
import PortalHeader, { getChartLookupHeader } from '../PortalHeader';
import PortalFooter from '../PortalFooter';
import PatientBanner from '../PatientBanner';
import { Patient, ViewState } from '../../types';
import { patients as allPatients } from '../../data/patients';

interface TriageNewProps {
  patient?: Patient;
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
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(patient);
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [pulse, setPulse] = useState('');
  const [respRate, setRespRate] = useState('');
  const [oxygenSat, setOxygenSat] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!selectedPatient) {
      alert('Please select a patient first');
      return;
    }

    // In a real app, this would save the triage entry
    alert(`Triage entry saved for ${selectedPatient.firstName} ${selectedPatient.lastName}`);
    goHome();
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <div className="portal-container">
      <PortalHeader buttons={getChartLookupHeader(goBack, goHome)} />

      {selectedPatient && <PatientBanner patient={selectedPatient} />}

      <div className="portal-content">
        <div className="portal-section-header">New Triage Entry</div>

        <div className="portal-triage-form">
          {/* Patient Selection (if not pre-selected) */}
          {!patient && (
            <div className="portal-triage-section">
              <h3>Select Patient</h3>
              <select
                value={selectedPatient?.id || ''}
                onChange={(e) => {
                  const patientId = parseInt(e.target.value);
                  const found = allPatients.find((p) => p.id === patientId);
                  setSelectedPatient(found);
                }}
                style={{
                  width: '100%',
                  padding: 12,
                  border: '1px solid #e0e0e0',
                  borderRadius: 4,
                  fontSize: 14,
                }}
              >
                <option value="">Select a patient...</option>
                {allPatients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.lastName}, {p.firstName} ({p.dob})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Chief Complaint */}
          <div className="portal-triage-section">
            <h3>Chief Complaint</h3>
            <textarea
              value={chiefComplaint}
              onChange={(e) => setChiefComplaint(e.target.value)}
              placeholder="Enter chief complaint..."
              id="chiefComplaint"
              name="chiefComplaint"
            />
          </div>

          {/* Vitals */}
          <div className="portal-triage-section">
            <h3>Vitals</h3>
            <div className="portal-triage-vitals">
              <div className="portal-form-row">
                <label>Temperature (°F)</label>
                <input
                  type="text"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="98.6"
                  id="temperature"
                  name="temperature"
                />
              </div>
              <div className="portal-form-row">
                <label>Blood Pressure</label>
                <input
                  type="text"
                  value={bloodPressure}
                  onChange={(e) => setBloodPressure(e.target.value)}
                  placeholder="120/80"
                  id="bloodPressure"
                  name="bloodPressure"
                />
              </div>
              <div className="portal-form-row">
                <label>Pulse (bpm)</label>
                <input
                  type="text"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  placeholder="72"
                  id="pulse"
                  name="pulse"
                />
              </div>
              <div className="portal-form-row">
                <label>Resp Rate</label>
                <input
                  type="text"
                  value={respRate}
                  onChange={(e) => setRespRate(e.target.value)}
                  placeholder="16"
                  id="respRate"
                  name="respRate"
                />
              </div>
              <div className="portal-form-row">
                <label>O2 Sat (%)</label>
                <input
                  type="text"
                  value={oxygenSat}
                  onChange={(e) => setOxygenSat(e.target.value)}
                  placeholder="98"
                  id="oxygenSat"
                  name="oxygenSat"
                />
              </div>
              <div className="portal-form-row">
                <label>Weight (lbs)</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="150"
                  id="weight"
                  name="weight"
                />
              </div>
              <div className="portal-form-row">
                <label>Height</label>
                <input
                  type="text"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="5ft 10in"
                  id="height"
                  name="height"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="portal-triage-section">
            <h3>Additional Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter additional notes..."
              id="triageNotes"
              name="triageNotes"
            />
          </div>

          {/* Action Buttons */}
          <div className="portal-triage-section" style={{ display: 'flex', gap: 16 }}>
            <button
              onClick={handleSubmit}
              className="portal-login-btn"
              style={{ flex: 1 }}
              id="submitTriage"
            >
              Save Triage
            </button>
            <button
              onClick={handleCancel}
              className="portal-login-btn"
              style={{ flex: 1, backgroundColor: '#757575' }}
              id="cancelTriage"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
