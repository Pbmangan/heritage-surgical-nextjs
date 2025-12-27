'use client';

import { useState } from 'react';
import PortalHeader, { getDrugLookupHeader } from '../PortalHeader';
import PortalFooter from '../PortalFooter';
import { Patient, Drug, ViewState } from '../../types';
import { searchDrugs } from '../../data/drugs';

interface DrugLookupProps {
  patient?: Patient;
  userName: string;
  navigate: (view: ViewState) => void;
  goBack: () => void;
  goHome: () => void;
  onLogout: () => void;
}

export default function DrugLookup({
  patient,
  userName,
  navigate,
  goBack,
  goHome,
  onLogout,
}: DrugLookupProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Drug[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    if (searchQuery.length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);

    // Add realistic delay for Playwright testing
    await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 150));

    const searchResults = searchDrugs(searchQuery);
    setResults(searchResults);
    setIsSearching(false);
  };

  const handleDrugSelect = (drug: Drug) => {
    // In a real app, this would add the drug to the patient's medications
    alert(`Selected: ${drug.name} ${drug.dosage} ${drug.form}\nNDC: ${drug.ndc}`);
    if (patient) {
      navigate({ screen: 'medications', patient });
    } else {
      goBack();
    }
  };

  return (
    <div className="portal-container">
      <PortalHeader buttons={getDrugLookupHeader(goBack, goHome)} />

      <div className="portal-content">
        <div className="portal-section-header">
          Drug Lookup
          {results.length > 0 && <span className="badge">{results.length}</span>}
        </div>

        <div className="portal-form">
          <div className="portal-form-row">
            <input
              type="text"
              placeholder="Drug Name or NDC/UPC/HRI"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
              id="drugQuery"
              name="drugQuery"
            />
          </div>
        </div>

        {isSearching && (
          <div style={{ padding: 16, textAlign: 'center', color: '#757575' }}>
            Searching...
          </div>
        )}

        {!isSearching && query.length >= 2 && results.length === 0 && (
          <div style={{ padding: 16, textAlign: 'center', color: '#757575' }}>
            No drugs found
          </div>
        )}

        {!isSearching && results.length > 0 && (
          <div className="portal-search-results">
            {results.map((drug) => (
              <div
                key={drug.id}
                className="portal-drug-item"
                onClick={() => handleDrugSelect(drug)}
                data-drug-id={drug.id}
              >
                <div className="portal-drug-name">
                  {drug.name}{' '}
                  <span className="portal-drug-dosage">{drug.dosage}</span>{' '}
                  {drug.form}{' '}
                  <span className="portal-drug-ndc">NDC {drug.ndc}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PortalFooter userName={userName} onLogout={onLogout} />
    </div>
  );
}
