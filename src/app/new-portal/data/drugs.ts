import { Drug } from '../types';

export const drugs: Drug[] = [
  // Lisinopril variations
  { id: 1, name: 'Lisinopril', ndc: '00093-1234-56', dosage: '2.5 MG', form: 'Tablets', manufacturer: 'Teva' },
  { id: 2, name: 'Lisinopril', ndc: '00093-1235-57', dosage: '5 MG', form: 'Tablets', manufacturer: 'Teva' },
  { id: 3, name: 'Lisinopril', ndc: '00093-1236-58', dosage: '10 MG', form: 'Tablets', manufacturer: 'Teva' },
  { id: 4, name: 'Lisinopril', ndc: '00093-1237-59', dosage: '20 MG', form: 'Tablets', manufacturer: 'Teva' },
  { id: 5, name: 'Lisinopril', ndc: '00093-1238-60', dosage: '40 MG', form: 'Tablets', manufacturer: 'Teva' },

  // Metformin variations
  { id: 10, name: 'Metformin', ndc: '00093-2345-67', dosage: '500 MG', form: 'Tablets', manufacturer: 'Mylan' },
  { id: 11, name: 'Metformin', ndc: '00093-2346-68', dosage: '850 MG', form: 'Tablets', manufacturer: 'Mylan' },
  { id: 12, name: 'Metformin', ndc: '00093-2347-69', dosage: '1000 MG', form: 'Tablets', manufacturer: 'Mylan' },
  { id: 13, name: 'Metformin ER', ndc: '00093-2348-70', dosage: '500 MG', form: 'Tablets', manufacturer: 'Mylan' },
  { id: 14, name: 'Metformin ER', ndc: '00093-2349-71', dosage: '750 MG', form: 'Tablets', manufacturer: 'Mylan' },

  // Atorvastatin variations
  { id: 20, name: 'Atorvastatin', ndc: '00093-3456-78', dosage: '10 MG', form: 'Tablets', manufacturer: 'Ranbaxy' },
  { id: 21, name: 'Atorvastatin', ndc: '00093-3457-79', dosage: '20 MG', form: 'Tablets', manufacturer: 'Ranbaxy' },
  { id: 22, name: 'Atorvastatin', ndc: '00093-3458-80', dosage: '40 MG', form: 'Tablets', manufacturer: 'Ranbaxy' },
  { id: 23, name: 'Atorvastatin', ndc: '00093-3459-81', dosage: '80 MG', form: 'Tablets', manufacturer: 'Ranbaxy' },

  // Omeprazole variations
  { id: 30, name: 'Omeprazole', ndc: '00093-4567-89', dosage: '10 MG', form: 'Capsules', manufacturer: 'Dr. Reddy\'s' },
  { id: 31, name: 'Omeprazole', ndc: '00093-4568-90', dosage: '20 MG', form: 'Capsules', manufacturer: 'Dr. Reddy\'s' },
  { id: 32, name: 'Omeprazole', ndc: '00093-4569-91', dosage: '40 MG', form: 'Capsules', manufacturer: 'Dr. Reddy\'s' },

  // Amlodipine variations
  { id: 40, name: 'Amlodipine', ndc: '00093-5678-90', dosage: '2.5 MG', form: 'Tablets', manufacturer: 'Pfizer' },
  { id: 41, name: 'Amlodipine', ndc: '00093-5679-91', dosage: '5 MG', form: 'Tablets', manufacturer: 'Pfizer' },
  { id: 42, name: 'Amlodipine', ndc: '00093-5680-92', dosage: '10 MG', form: 'Tablets', manufacturer: 'Pfizer' },

  // Hydrochlorothiazide variations
  { id: 50, name: 'Hydrochlorothiazide', ndc: '00093-6789-01', dosage: '12.5 MG', form: 'Tablets', manufacturer: 'Sandoz' },
  { id: 51, name: 'Hydrochlorothiazide', ndc: '00093-6790-02', dosage: '25 MG', form: 'Tablets', manufacturer: 'Sandoz' },
  { id: 52, name: 'Hydrochlorothiazide', ndc: '00093-6791-03', dosage: '50 MG', form: 'Tablets', manufacturer: 'Sandoz' },

  // Levothyroxine variations
  { id: 60, name: 'Levothyroxine', ndc: '00093-7890-12', dosage: '25 MCG', form: 'Tablets', manufacturer: 'Synthroid' },
  { id: 61, name: 'Levothyroxine', ndc: '00093-7891-13', dosage: '50 MCG', form: 'Tablets', manufacturer: 'Synthroid' },
  { id: 62, name: 'Levothyroxine', ndc: '00093-7892-14', dosage: '75 MCG', form: 'Tablets', manufacturer: 'Synthroid' },
  { id: 63, name: 'Levothyroxine', ndc: '00093-7893-15', dosage: '100 MCG', form: 'Tablets', manufacturer: 'Synthroid' },
  { id: 64, name: 'Levothyroxine', ndc: '00093-7894-16', dosage: '125 MCG', form: 'Tablets', manufacturer: 'Synthroid' },

  // Sertraline variations
  { id: 70, name: 'Sertraline', ndc: '00093-8901-23', dosage: '25 MG', form: 'Tablets', manufacturer: 'Greenstone' },
  { id: 71, name: 'Sertraline', ndc: '00093-8902-24', dosage: '50 MG', form: 'Tablets', manufacturer: 'Greenstone' },
  { id: 72, name: 'Sertraline', ndc: '00093-8903-25', dosage: '100 MG', form: 'Tablets', manufacturer: 'Greenstone' },

  // Albuterol
  { id: 80, name: 'Albuterol', ndc: '00093-9012-34', dosage: '90 MCG', form: 'Inhaler', manufacturer: 'ProAir' },
  { id: 81, name: 'Albuterol', ndc: '00093-9013-35', dosage: '2 MG', form: 'Tablets', manufacturer: 'ProAir' },
  { id: 82, name: 'Albuterol', ndc: '00093-9014-36', dosage: '4 MG', form: 'Tablets', manufacturer: 'ProAir' },

  // Gabapentin variations
  { id: 90, name: 'Gabapentin', ndc: '00093-1357-24', dosage: '100 MG', form: 'Capsules', manufacturer: 'Aurobindo' },
  { id: 91, name: 'Gabapentin', ndc: '00093-1358-25', dosage: '300 MG', form: 'Capsules', manufacturer: 'Aurobindo' },
  { id: 92, name: 'Gabapentin', ndc: '00093-1359-26', dosage: '400 MG', form: 'Capsules', manufacturer: 'Aurobindo' },
  { id: 93, name: 'Gabapentin', ndc: '00093-1360-27', dosage: '600 MG', form: 'Tablets', manufacturer: 'Aurobindo' },
  { id: 94, name: 'Gabapentin', ndc: '00093-1361-28', dosage: '800 MG', form: 'Tablets', manufacturer: 'Aurobindo' },

  // Losartan variations
  { id: 100, name: 'Losartan', ndc: '00093-2468-35', dosage: '25 MG', form: 'Tablets', manufacturer: 'Accord' },
  { id: 101, name: 'Losartan', ndc: '00093-2469-36', dosage: '50 MG', form: 'Tablets', manufacturer: 'Accord' },
  { id: 102, name: 'Losartan', ndc: '00093-2470-37', dosage: '100 MG', form: 'Tablets', manufacturer: 'Accord' },

  // Additional common medications
  { id: 110, name: 'Amoxicillin', ndc: '00093-3571-46', dosage: '250 MG', form: 'Capsules', manufacturer: 'Sandoz' },
  { id: 111, name: 'Amoxicillin', ndc: '00093-3572-47', dosage: '500 MG', form: 'Capsules', manufacturer: 'Sandoz' },
  { id: 112, name: 'Azithromycin', ndc: '00093-3573-48', dosage: '250 MG', form: 'Tablets', manufacturer: 'Pfizer' },
  { id: 113, name: 'Azithromycin', ndc: '00093-3574-49', dosage: '500 MG', form: 'Tablets', manufacturer: 'Pfizer' },
  { id: 114, name: 'Prednisone', ndc: '00093-3575-50', dosage: '5 MG', form: 'Tablets', manufacturer: 'Roxane' },
  { id: 115, name: 'Prednisone', ndc: '00093-3576-51', dosage: '10 MG', form: 'Tablets', manufacturer: 'Roxane' },
  { id: 116, name: 'Prednisone', ndc: '00093-3577-52', dosage: '20 MG', form: 'Tablets', manufacturer: 'Roxane' },
  { id: 117, name: 'Ibuprofen', ndc: '00093-3578-53', dosage: '400 MG', form: 'Tablets', manufacturer: 'Perrigo' },
  { id: 118, name: 'Ibuprofen', ndc: '00093-3579-54', dosage: '600 MG', form: 'Tablets', manufacturer: 'Perrigo' },
  { id: 119, name: 'Ibuprofen', ndc: '00093-3580-55', dosage: '800 MG', form: 'Tablets', manufacturer: 'Perrigo' },
];

export function searchDrugs(query: string): Drug[] {
  if (!query || query.length < 2) {
    return [];
  }

  const lowerQuery = query.toLowerCase();

  return drugs.filter((drug) => {
    return (
      drug.name.toLowerCase().includes(lowerQuery) ||
      drug.ndc.includes(query) ||
      (drug.manufacturer && drug.manufacturer.toLowerCase().includes(lowerQuery))
    );
  });
}

export function getDrugById(id: number): Drug | undefined {
  return drugs.find((d) => d.id === id);
}
