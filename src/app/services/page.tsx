import { applyServerFriction, getCacheBuster } from '@/lib/friction';
import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ServicesPage() {
  await applyServerFriction();

  const services = [
    {
      name: 'Total Joint Replacement',
      description: 'Hip, knee, and shoulder replacement surgery with state-of-the-art implants',
      waitTime: '4-6 weeks',
      insurance: 'Most plans accepted',
    },
    {
      name: 'Arthroscopic Surgery',
      description: 'Minimally invasive procedures for knee, shoulder, and ankle conditions',
      waitTime: '2-3 weeks',
      insurance: 'Most plans accepted',
    },
    {
      name: 'Sports Medicine',
      description: 'Treatment of athletic injuries including ACL reconstruction, rotator cuff repair',
      waitTime: '1-2 weeks',
      insurance: 'Most plans accepted',
    },
    {
      name: 'Spine Surgery',
      description: 'Herniated disc, spinal stenosis, and fusion procedures',
      waitTime: '6-8 weeks',
      insurance: 'Pre-authorization required',
    },
    {
      name: 'Fracture Care',
      description: 'Emergency and scheduled treatment of bone fractures',
      waitTime: 'Same day - 1 week',
      insurance: 'Most plans accepted',
    },
    {
      name: 'Hand & Upper Extremity',
      description: 'Carpal tunnel, trigger finger, and trauma surgery',
      waitTime: '2-4 weeks',
      insurance: 'Most plans accepted',
    },
  ];

  return (
    <main className="container">
      <h2 className="page-title">Our Services</h2>

      <div className="callout-box">
        <strong>📞 Questions about services?</strong> Call our scheduling line at (555) 123-4567
        to discuss your condition with our care coordinators.
      </div>

      <table className="table-layout">
        <thead>
          <tr>
            <th>Service</th>
            <th>Description</th>
            <th>Typical Wait Time</th>
            <th>Insurance</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td><strong>{service.name}</strong></td>
              <td>{service.description}</td>
              <td>{service.waitTime}</td>
              <td>{service.insurance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="note-block">
        <strong>Note:</strong> Wait times are estimates and may vary based on surgeon
        availability, insurance authorization, and medical necessity. Emergency cases
        are prioritized.
      </div>

      <h3>Pre-Operative Requirements</h3>
      <ul className="features-list">
        <li>Medical clearance from primary care physician (within 30 days)</li>
        <li>Pre-operative lab work and imaging as ordered</li>
        <li>Insurance pre-authorization (our staff will assist)</li>
        <li>Completed intake forms submitted 48 hours before appointment</li>
        <li>List of current medications</li>
      </ul>

      <div className="image-wall">
        <div className="image-placeholder">
          <span>[Joint Replacement{getCacheBuster()}]</span>
        </div>
        <div className="image-placeholder">
          <span>[Arthroscopy{getCacheBuster()}]</span>
        </div>
        <div className="image-placeholder">
          <span>[Physical Therapy{getCacheBuster()}]</span>
        </div>
      </div>

      <div className="warning">
        <strong>Important:</strong> Some services require referral from your primary care
        physician. Please check with your insurance provider regarding coverage and
        pre-authorization requirements.
      </div>

      <p style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/schedule" className="btn-primary" style={{ textDecoration: 'none' }}>
          Schedule a Consultation
        </Link>
      </p>
    </main>
  );
}
