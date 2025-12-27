'use client';

import { useState } from 'react';
import PortalHeader, { getMedicationDetailHeader } from '../PortalHeader';
import PortalFooter from '../PortalFooter';
import PatientBanner from '../PatientBanner';
import { Patient, Medication, ViewState } from '../../types';

interface MedicationDetailProps {
  patient: Patient;
  medication: Medication;
  userName: string;
  navigate: (view: ViewState) => void;
  goBack: () => void;
  goHome: () => void;
  onLogout: () => void;
}

export default function MedicationDetail({
  patient,
  medication,
  userName,
  navigate,
  goBack,
  goHome,
  onLogout,
}: MedicationDetailProps) {
  const [sig, setSig] = useState(medication.sig);
  const [quantity, setQuantity] = useState(medication.quantity.toString());
  const [refills, setRefills] = useState(medication.refills.toString());
  const [dispensings, setDispensings] = useState(medication.dispensings.toString());
  const [daw, setDaw] = useState(medication.daw);
  const [prescriber, setPrescriber] = useState(medication.prescriber);
  const [prescribedDate, setPrescribedDate] = useState(medication.prescribedDate);
  const [reorderedDate, setReorderedDate] = useState(medication.reorderedDate || '');
  const [discontinueDate, setDiscontinueDate] = useState(medication.discontinueDate || '');

  const handleDone = () => {
    // In a real app, this would save the changes
    goBack();
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <div className="portal-container">
      <PortalHeader buttons={getMedicationDetailHeader(handleDone, handleCancel, goHome)} />
      <PatientBanner patient={patient} />

      <div className="portal-content">
        <div className="portal-medication-detail">
          {/* Left Column - Notifications / Prescription Info */}
          <div className="portal-detail-section">
            <div className="portal-section-header" style={{ cursor: 'pointer' }}>
              Notifications
              <span style={{ marginLeft: 'auto' }}>▼</span>
            </div>

            <div className="portal-section-header">Prescription Information</div>

            <div className="portal-form">
              <div className="portal-form-row">
                <div style={{ fontWeight: 'bold', marginBottom: 8 }}>
                  {medication.name.toUpperCase()} {medication.dosage} {medication.form.toUpperCase()}
                </div>
                <div style={{ color: '#1976d2', fontSize: 12 }}>
                  NDC: {medication.ndc}
                </div>
              </div>

              <div className="portal-form-row">
                <label>SIG</label>
                <textarea
                  value={sig}
                  onChange={(e) => setSig(e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: 8, border: '1px solid #e0e0e0', borderRadius: 4 }}
                />
              </div>

              <div className="portal-form-row">
                <label>Quantity</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="portal-form-row">
                <label>Refills</label>
                <input
                  type="text"
                  value={refills}
                  onChange={(e) => setRefills(e.target.value)}
                />
              </div>

              <div className="portal-form-row">
                <label>Dispensings</label>
                <input
                  type="text"
                  value={dispensings}
                  onChange={(e) => setDispensings(e.target.value)}
                />
              </div>

              <div className="portal-form-row">
                <label>MDD</label>
                <input type="text" placeholder="" />
              </div>

              <div className="portal-form-row">
                <label>Disc Days</label>
                <input type="text" placeholder="" />
              </div>

              <div className="portal-form-row">
                <label>DX</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input type="text" style={{ width: '50%' }} />
                  <input type="text" style={{ width: '50%' }} />
                </div>
              </div>

              <div className="portal-form-row">
                <label className="portal-checkbox">
                  <input
                    type="checkbox"
                    checked={daw}
                    onChange={(e) => setDaw(e.target.checked)}
                  />
                  DAW (Dispense As Written)
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Prescriber Information */}
          <div className="portal-detail-section">
            <div className="portal-section-header">Prescriber Information</div>

            <div className="portal-form">
              <div className="portal-form-row">
                <label>Prescriber</label>
                <input
                  type="text"
                  value={prescriber}
                  onChange={(e) => setPrescriber(e.target.value)}
                  placeholder="Prescriber"
                />
              </div>
            </div>

            <div className="portal-section-header">Dates</div>

            <div className="portal-form">
              <div className="portal-form-row">
                <label>Prescribed</label>
                <input
                  type="text"
                  value={prescribedDate}
                  onChange={(e) => setPrescribedDate(e.target.value)}
                />
              </div>

              <div className="portal-form-row">
                <label>Reordered</label>
                <input
                  type="text"
                  value={reorderedDate}
                  onChange={(e) => setReorderedDate(e.target.value)}
                />
              </div>

              <div className="portal-form-row">
                <label>Discontinue</label>
                <input
                  type="text"
                  value={discontinueDate}
                  onChange={(e) => setDiscontinueDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
