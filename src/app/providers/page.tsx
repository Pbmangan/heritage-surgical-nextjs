import { applyServerFriction, getCacheBuster } from '@/lib/friction';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProvidersPage() {
  await applyServerFriction();

  const surgeons = [
    {
      name: 'Dr. Robert Heritage, MD, FAAOS',
      specialty: 'Total Joint Replacement',
      credentials: 'Board Certified, Fellowship Trained',
      location: 'Main Campus',
      experience: '32 years',
    },
    {
      name: 'Dr. Sarah Mitchell, MD',
      specialty: 'Sports Medicine',
      credentials: 'Board Certified',
      location: 'North Clinic',
      experience: '18 years',
    },
    {
      name: 'Dr. James Wong, MD, PhD',
      specialty: 'Spine Surgery',
      credentials: 'Board Certified, Research Director',
      location: 'Main Campus',
      experience: '22 years',
    },
  ];

  const advancedPractitioners = [
    {
      name: 'Lauren Mockwell, PA-C',
      specialty: 'Orthopedic Surgery',
      location: 'Main Campus',
      accepting: 'Yes',
    },
    {
      name: 'Kathryn Gordonette, NP',
      specialty: 'Sports Medicine',
      location: 'North Clinic',
      accepting: 'Yes',
    },
    {
      name: 'Kaitlin Dragonnette, NP',
      specialty: 'Joint Replacement',
      location: 'South Office',
      accepting: 'Yes',
    },
    {
      name: 'Valerie McDonald, RPA-C',
      specialty: 'Spine Surgery',
      location: 'Main Campus',
      accepting: 'Limited',
    },
  ];

  return (
    <main className="container">
      <h2 className="page-title">Our Providers</h2>

      <div className="callout-box">
        <strong>🩺 Meet Our Team:</strong> Our providers combine decades of experience
        with compassionate, patient-centered care. All surgeons are board-certified
        and participate in continuing education programs.
      </div>

      <h3>Surgeons</h3>
      <table className="table-layout">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Specialty</th>
            <th>Credentials</th>
            <th>Location</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {surgeons.map((provider, index) => (
            <tr key={index}>
              <td><strong>{provider.name}</strong></td>
              <td>{provider.specialty}</td>
              <td>{provider.credentials}</td>
              <td>{provider.location}</td>
              <td>{provider.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Advanced Practice Providers</h3>
      <table className="table-layout">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Specialty</th>
            <th>Location</th>
            <th>Accepting New Patients</th>
          </tr>
        </thead>
        <tbody>
          {advancedPractitioners.map((provider, index) => (
            <tr key={index}>
              <td><strong>{provider.name}</strong></td>
              <td>{provider.specialty}</td>
              <td>{provider.location}</td>
              <td>{provider.accepting}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="image-wall">
        <div className="image-placeholder">
          <span>[Dr. Heritage{getCacheBuster()}]</span>
        </div>
        <div className="image-placeholder">
          <span>[Dr. Mitchell{getCacheBuster()}]</span>
        </div>
        <div className="image-placeholder">
          <span>[Dr. Wong{getCacheBuster()}]</span>
        </div>
        <div className="image-placeholder">
          <span>[Team Photo{getCacheBuster()}]</span>
        </div>
      </div>

      <div className="note-block">
        <strong>Provider Availability:</strong> Some providers have limited availability
        due to surgical schedules. For urgent matters, our advanced practice providers
        can often see patients sooner. Call (555) 123-4567 for the next available appointment.
      </div>

      <fieldset className="legend-old">
        <legend>Languages Spoken</legend>
        <p>Our staff speaks: English, Spanish, Mandarin, Vietnamese, Korean</p>
        <p><em>Interpreter services available upon request for other languages.</em></p>
      </fieldset>

      <p style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/schedule" className="btn-primary" style={{ textDecoration: 'none' }}>
          Schedule with a Provider
        </Link>
      </p>
    </main>
  );
}
