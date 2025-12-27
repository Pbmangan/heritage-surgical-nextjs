'use client';

import { useState, useEffect } from 'react';
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
  const [currentUser, setCurrentUser] = useState('');

  // Listen for browser back/forward button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.view) {
        setView(event.state.view);
        if (event.state.currentUser !== undefined) {
          setCurrentUser(event.state.currentUser);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Set initial state on mount
    window.history.replaceState({ view, currentUser }, '');

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Navigation functions
  const navigate = (newView: ViewState, user?: string) => {
    setView(newView);
    window.history.pushState({ view: newView, currentUser: user ?? currentUser }, '');
  };

  const goBack = () => {
    window.history.back();
  };

  const goHome = () => {
    const homeView: ViewState = { screen: 'dashboard' };
    setView(homeView);
    window.history.pushState({ view: homeView, currentUser }, '');
  };

  const handleLogout = () => {
    const loginView: ViewState = { screen: 'login-userid' };
    setCurrentUser('');
    setView(loginView);
    // Replace current state to prevent going back to authenticated pages
    window.history.replaceState({ view: loginView, currentUser: '' }, '');
  };

  // Render the appropriate view based on current state
  const renderView = () => {
    switch (view.screen) {
      case 'login-userid':
        return (
          <LoginUserId
            onNext={(userId) => {
              setCurrentUser(userId);
              navigate({ screen: 'login-password', userId }, userId);
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
