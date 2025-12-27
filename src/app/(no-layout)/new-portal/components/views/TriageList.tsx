'use client';

import { useState } from 'react';
import PortalHeader, { getTriageListHeader } from '../PortalHeader';
import PortalFooter from '../PortalFooter';
import PatientBanner from '../PatientBanner';
import { Patient, ViewState, Triage } from '../../types';
import { triages as allTriages } from '../../data/triages';

interface TriageListProps {
  patient: Patient;
  userName: string;
  navigate: (view: ViewState) => void;
  goBack: () => void;
  goHome: () => void;
  onLogout: () => void;
}

export default function TriageList({
  patient,
  userName,
  navigate,
  goBack,
  goHome,
  onLogout,
}: TriageListProps) {
  const [selectedTriages, setSelectedTriages] = useState<number[]>([]);

  // Filter triages - in real app would filter by patient, here showing all as mock
  const openTriages = allTriages.filter((t) => t.status === 'Open');
  const closedTriages = allTriages.filter((t) => t.status === 'Closed');

  const handleNewTriage = () => {
    navigate({ screen: 'triage-new', patient });
  };

  const handleRefresh = () => {
    // In real app, would refresh data
    alert('Refreshing triage list...');
  };

  const handleTriageSelect = (id: number) => {
    setSelectedTriages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const renderTriageItem = (triage: Triage) => (
    <div key={triage.id} className="triage-list-item">
      <div className="triage-checkbox">
        <input
          type="checkbox"
          checked={selectedTriages.includes(triage.id)}
          onChange={() => handleTriageSelect(triage.id)}
        />
      </div>
      <div className="triage-content">
        <div className="triage-patient-name">{triage.patientName}</div>
        <div className="triage-type">{triage.type}</div>
        <div className="triage-description">{triage.description}</div>
      </div>
      <div className="triage-date-info">
        <div className="triage-date">{triage.date}</div>
        <div className="triage-created-by">(by {triage.createdBy})</div>
      </div>
    </div>
  );

  return (
    <div className="portal-container">
      <PortalHeader
        buttons={getTriageListHeader(goBack, handleNewTriage, handleRefresh, goHome)}
      />

      <PatientBanner patient={patient} />

      <div className="portal-content">
        {/* Open Section */}
        <div className="triage-section-header triage-section-open">Open</div>
        <div className="triage-list-section">
          {openTriages.length === 0 ? (
            <div className="triage-empty">No open triages</div>
          ) : (
            openTriages.map(renderTriageItem)
          )}
        </div>

        {/* Closed Section */}
        <div className="triage-section-header triage-section-closed">Closed</div>
        <div className="triage-list-section">
          {closedTriages.length === 0 ? (
            <div className="triage-empty">No closed triages</div>
          ) : (
            closedTriages.map(renderTriageItem)
          )}
        </div>
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
