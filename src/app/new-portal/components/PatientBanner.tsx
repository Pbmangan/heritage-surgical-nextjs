'use client';

import { Patient } from '../types';

interface PatientBannerProps {
  patient: Patient;
}

export default function PatientBanner({ patient }: PatientBannerProps) {
  const genderClass = patient.gender === 'M' ? 'malePatient' : 'femalePatient';

  return (
    <div className="subtitle highlightSubtitle portal-patient-banner">
      <div id="subtitle_patient_info">
        <div className="portalActive"></div>
        <div className="patientGender">
          <div className={genderClass}>
            {patient.firstName} {patient.lastName}
          </div>
          <div className="accountNumber"></div>
          <div className="patientAge">
            <span className="sexNotation"></span>
            {patient.age} yrs, {patient.dob}
          </div>
        </div>
      </div>
      <div>
        <input id="iPatRecord" name="iPatRecord" type="hidden" value={patient.id} />
        <input id="iDepRecord" name="iDepRecord" type="hidden" value="0" />
        <input id="iIsChart" type="hidden" value="1" />
        <input id="iHasPortal" type="hidden" value="1" />
      </div>
    </div>
  );
}
