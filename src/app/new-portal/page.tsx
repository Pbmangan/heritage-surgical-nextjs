'use client';

import { useState } from 'react';
import './portal.css';
import { ViewState, Patient, Medication } from './types';

// Import all view components
import LoginUserId from './components/views/LoginUserId';
import LoginPassword from './components/views/LoginPassword';
import LoginSecurity from './components/views/LoginSecurity';
import Dashboard from './components/views/Dashboard';
import ChartLookup from './components/views/ChartLookup';
import PatientChart from './components/views/PatientChart';
import Medications from './components/views/Medications';
import MedicationDetail from './components/views/MedicationDetail';
import DrugLookup from './components/views/DrugLookup';
import TriageNew from './components/views/TriageNew';

export default function NewPortal() {
  // View state management
  const [view, setView] = useState<ViewState>({ screen: 'login-userid' });
  const [history, setHistory] = useState<ViewState[]>([]);
  const [currentUser, setCurrentUser] = useState('');

  // Navigation functions
  const navigate = (newView: ViewState) => {
    setHistory((prev) => [...prev, view]);
    setView(newView);
  };

  const goBack = () => {
    const prev = history[history.length - 1];
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setView(prev);
    }
  };

  const goHome = () => {
    setHistory([]);
    setView({ screen: 'dashboard' });
  };

  const handleLogout = () => {
    setHistory([]);
    setCurrentUser('');
    setView({ screen: 'login-userid' });
  };

  // Render the appropriate view based on current state
  const renderView = () => {
    switch (view.screen) {
      case 'login-userid':
        return (
          <LoginUserId
            onNext={(userId) => {
              setCurrentUser(userId);
              navigate({ screen: 'login-password', userId });
            }}
          />
        );

      case 'login-password':
        return (
          <LoginPassword
            userId={view.userId}
            onNext={() => navigate({ screen: 'login-security', userId: view.userId })}
          />
        );

      case 'login-security':
        return (
          <LoginSecurity
            userId={view.userId}
            onNext={() => navigate({ screen: 'dashboard' })}
          />
        );

      case 'dashboard':
        return (
          <Dashboard
            userName={currentUser || 'User'}
            navigate={navigate}
            onLogout={handleLogout}
          />
        );

      case 'chart-lookup':
        return (
          <ChartLookup
            userName={currentUser}
            navigate={navigate}
            goBack={goBack}
            goHome={goHome}
            onLogout={handleLogout}
          />
        );

      case 'patient-chart':
        return (
          <PatientChart
            patient={view.patient}
            userName={currentUser}
            navigate={navigate}
            goBack={goBack}
            goHome={goHome}
            onLogout={handleLogout}
          />
        );

      case 'medications':
        return (
          <Medications
            patient={view.patient}
            userName={currentUser}
            navigate={navigate}
            goBack={goBack}
            goHome={goHome}
            onLogout={handleLogout}
          />
        );

      case 'medication-detail':
        return (
          <MedicationDetail
            patient={view.patient}
            medication={view.medication}
            userName={currentUser}
            navigate={navigate}
            goBack={goBack}
            goHome={goHome}
            onLogout={handleLogout}
          />
        );

      case 'drug-lookup':
        return (
          <DrugLookup
            patient={view.patient}
            userName={currentUser}
            navigate={navigate}
            goBack={goBack}
            goHome={goHome}
            onLogout={handleLogout}
          />
        );

      case 'triage-new':
        return (
          <TriageNew
            patient={view.patient}
            userName={currentUser}
            navigate={navigate}
            goBack={goBack}
            goHome={goHome}
            onLogout={handleLogout}
          />
        );

      default:
        return (
          <Dashboard
            userName={currentUser || 'User'}
            navigate={navigate}
            onLogout={handleLogout}
          />
        );
    }
  };

  return (
    <div id="simulate-mobile-page" style={{ minHeight: 'auto' }}>
      <section id="page-container">
        {renderView()}
      </section>

      {/* Hidden system state vars for Playwright */}
      <div id="js-vars" style={{ display: 'none' }}>
        <input type="hidden" id="bIsSystemReady" value="1" />
        <input type="hidden" id="bIsSystemInitialized" value="1" />
        <input type="hidden" id="bIsPageLoaded" value="1" />
        <input type="hidden" id="currentScreen" value={view.screen} />
      </div>
    </div>
  );
}
