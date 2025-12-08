import { applyServerFriction } from '@/lib/friction';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function IntakeSuccessPage({ searchParams }: PageProps) {
  await applyServerFriction();

  const params = await searchParams;
  const emailStatus = params.email || 'unknown';

  return (
    <main className="container">
      <h2 className="page-title">Intake Form Submitted</h2>

      <div className="success-message">
        <h3>✓ Thank You!</h3>
        <p>Your intake form has been received and logged in our system.</p>
      </div>

      <div className="callout-box">
        <strong>What happens next?</strong>
        <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Our staff will review your submission within 1-2 business days</li>
          <li>You may receive a call to verify information or ask follow-up questions</li>
          <li>If you have an upcoming appointment, please arrive 15 minutes early</li>
          <li>Bring a photo ID and insurance card to your appointment</li>
        </ol>
      </div>

      <div className="note-block">
        <strong>Email Notification Status:</strong>{' '}
        {emailStatus === 'sent' ? (
          <span style={{ color: 'green' }}>✓ Confirmation email sent successfully</span>
        ) : emailStatus === 'failed' ? (
          <span style={{ color: 'red' }}>✗ Email notification could not be sent (submission still recorded)</span>
        ) : (
          <span style={{ color: 'orange' }}>⚠ Email status: {emailStatus}</span>
        )}
      </div>

      <fieldset className="legend-old">
        <legend>Staff Summary</legend>
        <p style={{ fontSize: '11px', color: '#666' }}>
          <em>This section visible to coordinators for processing reference.</em>
        </p>
        <p>
          Submission captured at: {new Date().toLocaleString()}<br />
          Status: Pending Review<br />
          Priority: Standard
        </p>
      </fieldset>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link href="/" className="btn-primary" style={{ textDecoration: 'none', marginRight: '10px' }}>
          Return to Home
        </Link>
        <Link href="/schedule" className="btn-secondary" style={{ textDecoration: 'none' }}>
          Schedule an Appointment
        </Link>
      </div>
    </main>
  );
}
