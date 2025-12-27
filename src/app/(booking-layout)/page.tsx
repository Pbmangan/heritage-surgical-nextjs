import { applyServerFriction, getCacheBuster, shouldBloatResponse, generateBloatComments } from '@/lib/friction';
import LegacyProgress from '@/components/LegacyProgress';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  await applyServerFriction();

  const bloat = shouldBloatResponse() ? generateBloatComments() : '';

  return (
    <>
      {bloat && <div dangerouslySetInnerHTML={{ __html: bloat }} style={{ display: 'none' }} />}
      <main className="container">
        <h2 className="page-title">Welcome to Heritage Surgical Associates</h2>

        <div className="hero">
          <h2>Your Trusted Partner in Orthopedic Excellence</h2>
          <p>Serving the community with compassionate, patient-centered surgical care for over 35 years.</p>
          <LegacyProgress />
        </div>

        <div className="callout-box">
          <strong>📢 New Patients:</strong> Please complete our{' '}
          <Link href="/intake">online intake form</Link> before your first visit.
          Forms received 48 hours in advance help us serve you better!
        </div>

        <div className="note-block">
          <strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 5:00 PM<br />
          <strong>Urgent Care Line:</strong> (555) 123-4567 ext. 911<br />
          <em>Please allow 24-48 hours for non-urgent callback requests.</em>
        </div>

        <h3>Our Legacy of Care</h3>
        <table className="table-layout">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Board-Certified Surgeons</td>
              <td>All providers maintain active board certification</td>
              <td>✓ Active</td>
            </tr>
            <tr>
              <td>State-of-the-Art Facility</td>
              <td>Recently upgraded imaging equipment (2019)</td>
              <td>✓ Available</td>
            </tr>
            <tr>
              <td>Insurance Accepted</td>
              <td>Most major insurance plans accepted</td>
              <td>✓ Verified</td>
            </tr>
            <tr>
              <td><span className="broken-link">Online Records</span></td>
              <td>Patient portal access (coming soon)</td>
              <td>⏳ Pending</td>
            </tr>
            <tr>
              <td><span className="broken-link">Telehealth</span></td>
              <td>Virtual consultations</td>
              <td>⏳ Beta</td>
            </tr>
          </tbody>
        </table>

        <h3>Featured Services</h3>
        <ul className="features-list">
          <li>Total Joint Replacement (Hip, Knee, Shoulder)</li>
          <li>Arthroscopic Surgery</li>
          <li>Sports Medicine</li>
          <li>Spine Surgery</li>
          <li>Fracture Care</li>
          <li>Hand & Upper Extremity Surgery</li>
        </ul>

        <div className="image-wall">
          <div className="image-placeholder">
            <span>[MRI/CT Scan Image{getCacheBuster()}]</span>
          </div>
          <div className="image-placeholder">
            <span>[Waiting Room{getCacheBuster()}]</span>
          </div>
          <div className="image-placeholder">
            <span>[Surgical Suite{getCacheBuster()}]</span>
          </div>
          <div className="image-placeholder">
            <span>[Patient Consultation{getCacheBuster()}]</span>
          </div>
        </div>

        <div className="warning">
          <strong>⚠️ COVID-19 Notice:</strong> Masks are recommended but not required.
          Please reschedule if you are experiencing symptoms. Temperature screening
          may be conducted upon arrival.
        </div>

        <p style={{ textAlign: 'center', marginTop: '30px' }}>
          <Link href="/schedule" className="btn-primary" style={{ textDecoration: 'none' }}>
            Schedule an Appointment
          </Link>
        </p>
      </main>
    </>
  );
}
