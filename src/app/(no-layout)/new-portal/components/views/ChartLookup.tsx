'use client';

import { useState, useEffect, useRef } from 'react';
import PortalHeader, { getChartLookupHeader } from '../PortalHeader';
import PortalFooter from '../PortalFooter';
import { Patient, ViewState } from '../../types';
import { searchPatients } from '../../data/patients';

interface ChartLookupProps {
  userName: string;
  navigate: (view: ViewState) => void;
  goBack: () => void;
  goHome: () => void;
  onLogout: () => void;
}

export default function ChartLookup({
  userName,
  navigate,
  goBack,
  goHome,
  onLogout,
}: ChartLookupProps) {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [account, setAccount] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [results, setResults] = useState<Patient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-search when lastName changes (debounced)
  useEffect(() => {
    if (lastName.length >= 2) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      searchTimeoutRef.current = setTimeout(() => {
        handleSearch();
      }, 300);
    }
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [lastName]);

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(true);

    // Add realistic delay for Playwright testing
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));

    const searchResults = searchPatients({
      lastName: lastName || undefined,
      firstName: firstName || undefined,
      account: account || undefined,
      phone: phone || undefined,
      dob: dob || undefined,
    });

    setResults(searchResults);
    setIsSearching(false);
  };

  const handleInputChange = (
    setter: (value: string) => void,
    value: string
  ) => {
    setter(value);
    // Auto-search when typing in last name field
    if (value.length >= 2) {
      // Debounced search would go here in production
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const selectPatient = (patient: Patient) => {
    navigate({ screen: 'patient-chart', patient });
  };

  return (
    <div className="portal-container">
      <PortalHeader buttons={getChartLookupHeader(goBack, goHome)} />

      <div className="portal-content">
        <div className="portal-section-header">
          Patient Lookup
          {results.length > 0 && (
            <span className="badge">{results.length}</span>
          )}
        </div>

        <div className="portal-form">
          <div className="portal-form-row">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => handleInputChange(setLastName, e.target.value)}
              onKeyDown={handleKeyDown}
              id="lastName"
              name="lastName"
              autoFocus
            />
          </div>
          <div className="portal-form-row">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => handleInputChange(setFirstName, e.target.value)}
              onKeyDown={handleKeyDown}
              id="firstName"
              name="firstName"
            />
          </div>
          <div className="portal-form-row">
            <input
              type="text"
              placeholder="Account"
              value={account}
              onChange={(e) => handleInputChange(setAccount, e.target.value)}
              onKeyDown={handleKeyDown}
              id="account"
              name="account"
            />
          </div>
          <div className="portal-form-row">
            <input
              type="text"
              placeholder="10 digit phone number"
              value={phone}
              onChange={(e) => handleInputChange(setPhone, e.target.value)}
              onKeyDown={handleKeyDown}
              id="phone"
              name="phone"
            />
          </div>
          <div className="portal-form-row">
            <label style={{ fontWeight: 'bold', marginBottom: 4 }}>Search by DOB</label>
            <input
              type="text"
              placeholder="mm/dd/yyyy"
              value={dob}
              onChange={(e) => handleInputChange(setDob, e.target.value)}
              onKeyDown={handleKeyDown}
              id="dob"
              name="dob"
            />
          </div>
        </div>

        {isSearching && (
          <div style={{ padding: 16, textAlign: 'center', color: '#757575' }}>
            Searching...
          </div>
        )}

        {!isSearching && hasSearched && results.length === 0 && (
          <div style={{ padding: 16, textAlign: 'center', color: '#757575' }}>
            No patients found
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div className="portal-search-results">
            {results.map((patient) => (
              <div
                key={patient.id}
                className="portal-search-result"
                onClick={() => selectPatient(patient)}
                data-patient-id={patient.id}
              >
                {patient.lastName}, {patient.firstName} ({patient.dob}) #{patient.accountNumber}
              </div>
            ))}
          </div>
        )}
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
