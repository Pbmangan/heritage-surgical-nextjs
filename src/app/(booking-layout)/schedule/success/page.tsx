import { applyServerFriction } from '@/lib/friction';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{
    provider?: string;
    credentials?: string;
    date?: string;
    time?: string;
    location?: string;
    email?: string;
  }>;
}

export default async function ScheduleSuccessPage({ searchParams }: PageProps) {
  await applyServerFriction();

  const params = await searchParams;
  const provider = params.provider || '';
  const credentials = params.credentials || '';
  const date = params.date || '';
  const time = params.time || '';
  const location = params.location || '';
  const emailStatus = params.email || 'unknown';

  return (
    <main className="container">
      <h2 className="page-title">Appointment Scheduled</h2>

      <div className="success-message">
        <h3>✓ Your Appointment is Confirmed!</h3>
        <p>Thank you for scheduling with Heritage Surgical Associates.</p>
      </div>

      <div className="scheduler-section">
        <h3>Appointment Details</h3>
        <table className="table-layout">
          <tbody>
            <tr>
              <td><strong>Provider</strong></td>
              <td>{provider}, {credentials}</td>
            </tr>
            <tr>
              <td><strong>Date</strong></td>
              <td>{date}</td>
            </tr>
            <tr>
              <td><strong>Time</strong></td>
              <td>{time}</td>
            </tr>
            <tr>
              <td><strong>Location</strong></td>
              <td>{location}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="callout-box">
        <strong>Before Your Appointment:</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Arrive 15 minutes early to complete check-in</li>
          <li>Bring photo ID and insurance card</li>
          <li>Bring a list of current medications</li>
          <li>Complete the <Link href="/intake">intake form</Link> if not already done</li>
        </ul>
      </div>

      <div className="note-block">
        <strong>Email Confirmation Status:</strong>{' '}
        {emailStatus === 'sent' ? (
          <span style={{ color: 'green' }}>✓ Confirmation email sent successfully</span>
        ) : emailStatus === 'failed' ? (
          <span style={{ color: 'red' }}>✗ Email notification could not be sent</span>
        ) : (
          <span style={{ color: 'orange' }}>⚠ Email status: {emailStatus}</span>
        )}
      </div>

      <fieldset className="legend-old">
        <legend>Staff Summary</legend>
        <p style={{ fontSize: '11px', color: '#666' }}>
          <em>This section visible to scheduling coordinators.</em>
        </p>
        <p>
          Appointment held at: {new Date().toLocaleString()}<br />
          Status: Confirmed - Pending Insurance Verification<br />
          Reminder: Scheduled for 24h prior
        </p>
      </fieldset>

      <div className="warning">
        <strong>Need to Cancel or Reschedule?</strong><br />
        Please call (555) 123-4567 at least 24 hours in advance to avoid
        cancellation fees.
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none', marginRight: '10px' }}>
          Return to Home
        </Link>
        <Link href="/intake" className="btn-secondary" style={{ textDecoration: 'none' }}>
          Complete Intake Form
        </Link>
      </div>
    </main>
  );
}
