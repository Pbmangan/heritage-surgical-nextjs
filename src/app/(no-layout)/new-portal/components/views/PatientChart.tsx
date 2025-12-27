'use client';

import PortalHeader, { getPatientChartHeader } from '../PortalHeader';
import PortalFooter from '../PortalFooter';
import PatientBanner from '../PatientBanner';
import ListingMenuItem from '../ListingMenuItem';
import { Patient, ViewState } from '../../types';

interface PatientChartProps {
  patient: Patient;
  userName: string;
  navigate: (view: ViewState) => void;
  goBack: () => void;
  goHome: () => void;
  onLogout: () => void;
}

export default function PatientChart({
  patient,
  userName,
  navigate,
  goBack,
  goHome,
  onLogout,
}: PatientChartProps) {
  const menuItems = [
    {
      id: `^10^P${patient.id}^D0`,
      label: 'Allergies',
      onClick: () => alert('Allergies - Not implemented'),
    },
    {
      id: `^14^P${patient.id}^D0`,
      label: 'Medications',
      onClick: () => navigate({ screen: 'medications', patient }),
    },
    {
      id: `^22^P${patient.id}^D0`,
      label: 'Triage',
      onClick: () => navigate({ screen: 'triage-new', patient }),
    },
    {
      id: `^20^P${patient.id}^D0`,
      label: 'Todo',
      onClick: () => alert('Todo - Not implemented'),
    },
    {
      id: `^37^P${patient.id}^D0`,
      label: 'E-Superbill',
      onClick: () => alert('E-Superbill - Not implemented'),
    },
    {
      id: `^30^P${patient.id}^D0`,
      label: 'All Documents',
      onClick: () => alert('All Documents - Not implemented'),
    },
  ];

  return (
    <div className="portal-container">
      <PortalHeader buttons={getPatientChartHeader(goBack, goHome)} />
      <PatientBanner patient={patient} />

      <div className="portal-content">
        <div className="listing_screen" data-mm_listing_type="patient_chart">
          {menuItems.map((item) => (
            <ListingMenuItem
              key={item.id}
              itemId={item.id}
              areaId="11"
              label={item.label}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>

      {/* Hidden patient contact fields for Playwright */}
      <div id="patient_contact_hidden_fields" style={{ display: 'none' }}>
        <input id="iPatient" type="hidden" value={patient.id} />
        <input id="iIsDependent" type="hidden" value="0" />
        <input id="sName" type="hidden" value={`${patient.firstName} ${patient.lastName}`} />
        <input id="sGender" type="hidden" value={patient.gender} />
        <input id="sDob" type="hidden" value={patient.dob} />
        <input id="sAge" type="hidden" value={`${patient.age} yrs`} />
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
