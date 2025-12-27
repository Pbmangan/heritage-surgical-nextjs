import { Patient } from '../types';

export const patients: Patient[] = [
  {
    id: 45821,
    firstName: 'Sarah',
    lastName: 'Mitchell',
    dob: '03/15/1985',
    age: 39,
    gender: 'F',
    accountNumber: '45821',
    phone: '(716) 555-0123',
    email: 'sarah.mitchell@email.com',
    address: '142 Maple Street',
    city: 'Buffalo',
    state: 'NY',
    zip: '14201',
    status: 'Active',
  },
  {
    id: 38294,
    firstName: 'James',
    lastName: 'Wilson',
    dob: '07/22/1972',
    age: 52,
    gender: 'M',
    accountNumber: '38294',
    phone: '(716) 555-0456',
    email: 'james.wilson@email.com',
    address: '89 Oak Avenue',
    city: 'Orchard Park',
    state: 'NY',
    zip: '14127',
    status: 'Active',
  },
  {
    id: 52103,
    firstName: 'Emily',
    lastName: 'Chen',
    dob: '11/30/1990',
    age: 34,
    gender: 'F',
    accountNumber: '52103',
    phone: '(716) 555-0789',
    email: 'emily.chen@email.com',
    address: '256 Pine Road',
    city: 'Williamsville',
    state: 'NY',
    zip: '14221',
    status: 'Active',
  },
  {
    id: 29473,
    firstName: 'Robert',
    lastName: 'Martinez',
    dob: '04/04/2000',
    age: 24,
    gender: 'M',
    accountNumber: '29473',
    phone: '(716) 555-1234',
    email: 'robert.martinez@email.com',
    address: '6786 Old Lakeshore Road',
    city: 'Derby',
    state: 'NY',
    zip: '14047',
    status: 'Inactive',
  },
  {
    id: 61847,
    firstName: 'Patricia',
    lastName: 'Thompson',
    dob: '09/18/1968',
    age: 56,
    gender: 'F',
    accountNumber: '61847',
    phone: '(716) 555-5678',
    email: 'patricia.thompson@email.com',
    address: '432 Elm Street',
    city: 'Hamburg',
    state: 'NY',
    zip: '14075',
    status: 'Active',
  },
  {
    id: 73592,
    firstName: 'Michael',
    lastName: 'Johnson',
    dob: '02/14/1955',
    age: 69,
    gender: 'M',
    accountNumber: '73592',
    phone: '(716) 555-9012',
    email: 'michael.johnson@email.com',
    address: '78 Birch Lane',
    city: 'Cheektowaga',
    state: 'NY',
    zip: '14225',
    status: 'Active',
  },
  {
    id: 84126,
    firstName: 'Jennifer',
    lastName: 'Davis',
    dob: '06/25/1982',
    age: 42,
    gender: 'F',
    accountNumber: '84126',
    phone: '(716) 555-3456',
    email: 'jennifer.davis@email.com',
    address: '915 Cedar Court',
    city: 'Tonawanda',
    state: 'NY',
    zip: '14150',
    status: 'Active',
  },
  {
    id: 95438,
    firstName: 'William',
    lastName: 'Brown',
    dob: '12/08/1978',
    age: 46,
    gender: 'M',
    accountNumber: '95438',
    phone: '(716) 555-7890',
    email: 'william.brown@email.com',
    address: '321 Spruce Drive',
    city: 'Amherst',
    state: 'NY',
    zip: '14226',
    status: 'Active',
  },
];

// Search function with fuzzy matching
export function searchPatients(query: {
  lastName?: string;
  firstName?: string;
  account?: string;
  phone?: string;
  dob?: string;
}): Patient[] {
  return patients.filter((patient) => {
    // If no query params, return no results
    if (!query.lastName && !query.firstName && !query.account && !query.phone && !query.dob) {
      return false;
    }

    let matches = true;

    if (query.lastName) {
      matches = matches && patient.lastName.toLowerCase().includes(query.lastName.toLowerCase());
    }
    if (query.firstName) {
      matches = matches && patient.firstName.toLowerCase().includes(query.firstName.toLowerCase());
    }
    if (query.account) {
      matches = matches && patient.accountNumber.includes(query.account);
    }
    if (query.phone) {
      const cleanPhone = query.phone.replace(/\D/g, '');
      const patientCleanPhone = patient.phone.replace(/\D/g, '');
      matches = matches && patientCleanPhone.includes(cleanPhone);
    }
    if (query.dob) {
      matches = matches && patient.dob === query.dob;
    }

    return matches;
  });
}

export function getPatientById(id: number): Patient | undefined {
  return patients.find((p) => p.id === id);
}
