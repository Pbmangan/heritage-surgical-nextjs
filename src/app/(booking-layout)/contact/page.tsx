import { applyServerFriction } from '@/lib/friction';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  await applyServerFriction();

  const locations = [
    {
      name: 'Main Campus',
      address: '1200 Medical Center Drive, Suite 400',
      city: 'Anytown, USA 12345',
      phone: '(555) 123-4567',
      fax: '(555) 123-4568',
      hours: 'Mon-Fri 8:00 AM - 5:00 PM',
    },
    {
      name: 'North Clinic',
      address: '800 Healthcare Boulevard, Building B',
      city: 'Northville, USA 12346',
      phone: '(555) 234-5678',
      fax: '(555) 234-5679',
      hours: 'Mon-Thu 9:00 AM - 4:00 PM',
    },
    {
      name: 'South Office',
      address: '2500 Wellness Way, Floor 2',
      city: 'Southtown, USA 12347',
      phone: '(555) 345-6789',
      fax: '(555) 345-6790',
      hours: 'Tue-Fri 8:30 AM - 4:30 PM',
    },
  ];

  return (
    <main className="container">
      <h2 className="page-title">Contact Us</h2>

      <div className="callout-box">
        <strong>📞 Main Phone:</strong> (555) 123-4567<br />
        <strong>🚨 Urgent/After Hours:</strong> (555) 123-4567 ext. 911<br />
        <strong>📠 Main Fax:</strong> (555) 123-4568
      </div>

      <h3>Our Locations</h3>
      <table className="table-layout">
        <thead>
          <tr>
            <th>Location</th>
            <th>Address</th>
            <th>Phone / Fax</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc, index) => (
            <tr key={index}>
              <td><strong>{loc.name}</strong></td>
              <td>
                {loc.address}<br />
                {loc.city}
              </td>
              <td>
                📞 {loc.phone}<br />
                📠 {loc.fax}
              </td>
              <td>{loc.hours}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <fieldset className="legend-old">
        <legend>Map</legend>
        <div style={{
          background: '#f0f0f0',
          border: '2px inset #cccccc',
          padding: '40px',
          textAlign: 'center',
          color: '#666666',
        }}>
          <p>[Interactive Map Unavailable]</p>
          <p style={{ fontSize: '11px' }}>
            <em>The map component requires Internet Explorer 6.0 or later with ActiveX enabled.</em>
          </p>
          <p style={{ fontSize: '11px' }}>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
              Click here for directions via Google Maps
            </a>
          </p>
        </div>
      </fieldset>

      <div className="note-block">
        <strong>Parking Information:</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Main Campus: Free parking in Lot A (handicap accessible)</li>
          <li>North Clinic: Street parking or garage ($2/hour)</li>
          <li>South Office: Validated parking in attached garage</li>
        </ul>
      </div>

      <h3>Departments</h3>
      <table className="table-layout">
        <thead>
          <tr>
            <th>Department</th>
            <th>Extension</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Scheduling</td>
            <td>ext. 100</td>
            <td>scheduling@heritagesurgical.local</td>
          </tr>
          <tr>
            <td>Billing</td>
            <td>ext. 200</td>
            <td>billing@heritagesurgical.local</td>
          </tr>
          <tr>
            <td>Medical Records</td>
            <td>ext. 300</td>
            <td>records@heritagesurgical.local</td>
          </tr>
          <tr>
            <td>Insurance Verification</td>
            <td>ext. 400</td>
            <td>insurance@heritagesurgical.local</td>
          </tr>
          <tr>
            <td>Nurse Triage</td>
            <td>ext. 500</td>
            <td><em>Phone only</em></td>
          </tr>
        </tbody>
      </table>

      <div className="warning">
        <strong>⚠️ Email Response Times:</strong> Due to HIPAA regulations, we cannot
        discuss specific medical information via email. For medical questions,
        please call our office. Email responses may take 2-3 business days.
      </div>

      <fieldset className="legend-old">
        <legend>Online Resources (Under Construction)</legend>
        <ul>
          <li><span className="broken-link">Patient Portal Login</span></li>
          <li><span className="broken-link">Download Forms (PDF)</span></li>
          <li><span className="broken-link">Request Medical Records</span></li>
          <li><span className="broken-link">Pay Bill Online</span></li>
        </ul>
        <p style={{ fontSize: '11px', fontStyle: 'italic' }}>
          These features are currently being upgraded. Thank you for your patience.
        </p>
      </fieldset>
    </main>
  );
}
