'use client';

import PortalHeader, { getMedicationsHeader } from '../PortalHeader';
import PortalFooter from '../PortalFooter';
import PatientBanner from '../PatientBanner';
import { Patient, Medication, ViewState } from '../../types';
import { getActiveMedications, getDiscontinuedMedications } from '../../data/medications';

interface MedicationsProps {
  patient: Patient;
  userName: string;
  navigate: (view: ViewState) => void;
  goBack: () => void;
  goHome: () => void;
  onLogout: () => void;
}

export default function Medications({
  patient,
  userName,
  navigate,
  goBack,
  goHome,
  onLogout,
}: MedicationsProps) {
  const activeMeds = getActiveMedications(patient.id);
  const discontinuedMeds = getDiscontinuedMedications(patient.id);

  const handleNewMed = () => {
    navigate({ screen: 'drug-lookup', patient });
  };

  const handleMedicationClick = (medication: Medication) => {
    navigate({ screen: 'medication-detail', patient, medication });
  };

  return (
    <div className="portal-container">
      <PortalHeader buttons={getMedicationsHeader(goBack, handleNewMed, goHome)} />
      <PatientBanner patient={patient} />

      <div className="portal-content">
        {/* Active Medications */}
        <div className="portal-section-header">Active</div>
        {activeMeds.length === 0 ? (
          <div style={{ padding: 16, color: '#757575' }}>No active medications</div>
        ) : (
          activeMeds.map((med) => (
            <div
              key={med.id}
              className="portal-medication-item"
              onClick={() => handleMedicationClick(med)}
              data-medication-id={med.id}
            >
              <div className="portal-medication-name">
                {med.name}{' '}
                <span className="portal-medication-ndc">NDC {med.ndc}</span>
              </div>
              <div className="portal-medication-details">
                {med.dosage} {med.form}
              </div>
              <div className="portal-medication-details">
                Presc: {med.prescribedDate}, {med.sig.toLowerCase()}
              </div>
            </div>
          ))
        )}

        {/* Discontinued Medications */}
        <div className="portal-section-header">Discontinued</div>
        {discontinuedMeds.length === 0 ? (
          <div style={{ padding: 16, color: '#757575' }}>No discontinued medications</div>
        ) : (
          discontinuedMeds.map((med) => (
            <div
              key={med.id}
              className="portal-medication-item"
              onClick={() => handleMedicationClick(med)}
              data-medication-id={med.id}
            >
              <div className="portal-medication-name" style={{ color: '#d32f2f' }}>
                {med.name}{' '}
                <span className="portal-medication-ndc">NDC {med.ndc}</span>
              </div>
              <div className="portal-medication-details">
                {med.dosage} {med.form}
              </div>
            </div>
          ))
        )}
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
