// Types for the EHR Portal Mock

export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dob: string; // MM/DD/YYYY format
  age: number;
  gender: 'M' | 'F';
  accountNumber: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  status: 'Active' | 'Inactive';
}

export interface Medication {
  id: number;
  patientId: number;
  name: string;
  ndc: string;
  dosage: string;
  form: string; // Tablets, Capsules, etc.
  sig: string; // Instructions
  quantity: number;
  refills: number;
  dispensings: number;
  prescribedDate: string;
  reorderedDate?: string;
  discontinueDate?: string;
  prescriber: string;
  status: 'Active' | 'Discontinued';
  daw: boolean; // Dispense As Written
}

export interface Drug {
  id: number;
  name: string;
  ndc: string;
  dosage: string;
  form: string;
  manufacturer?: string;
}

export interface SearchQuery {
  lastName?: string;
  firstName?: string;
  account?: string;
  phone?: string;
  dob?: string;
}

// View state types for SPA navigation
export type ViewState =
  | { screen: 'login-userid' }
  | { screen: 'login-password'; userId: string }
  | { screen: 'login-security'; userId: string }
  | { screen: 'dashboard' }
  | { screen: 'chart-lookup' }
  | { screen: 'patient-chart'; patient: Patient }
  | { screen: 'medications'; patient: Patient }
  | { screen: 'medication-detail'; patient: Patient; medication: Medication }
  | { screen: 'drug-lookup'; patient?: Patient }
  | { screen: 'triage-new'; patient?: Patient };

// Navigation context for child components
export interface NavigationContext {
  navigate: (view: ViewState, user?: string) => void;
  goBack: () => void;
  goHome: () => void;
  currentUser: string;
}
