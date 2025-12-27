import { NextRequest, NextResponse } from 'next/server';
import { sendResendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  const data = await request.json();

  const {
    patientName,
    patientDob,
    patientId,
    user,
    status,
    reason,
    rating,
    subject,
    message,
    submittedBy,
  } = data;

  // Validation
  if (!patientName) {
    return NextResponse.json({ success: false, error: 'Patient information required' });
  }

  // Log submission
  console.log('Triage submission:', JSON.stringify(data, null, 2));

  // Build and send email
  const emailHtml = `
    <h2>New Triage Entry Submitted</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; font-family: Arial, sans-serif;">
      <tr style="background-color: #3f51b5; color: white;">
        <th colspan="2">Patient Information</th>
      </tr>
      <tr><td><strong>Patient</strong></td><td>${patientName}</td></tr>
      <tr><td><strong>DOB</strong></td><td>${patientDob}</td></tr>
      <tr><td><strong>Patient ID</strong></td><td>${patientId}</td></tr>

      <tr style="background-color: #3f51b5; color: white;">
        <th colspan="2">Route Information</th>
      </tr>
      <tr><td><strong>User</strong></td><td>${user || '(not assigned)'}</td></tr>
      <tr><td><strong>Status</strong></td><td>${status}</td></tr>
      <tr><td><strong>Reason</strong></td><td>${reason || '(none provided)'}</td></tr>
      <tr><td><strong>Rating</strong></td><td>${rating}</td></tr>

      <tr style="background-color: #3f51b5; color: white;">
        <th colspan="2">Subject & Message</th>
      </tr>
      <tr><td><strong>Subject</strong></td><td>${subject || '(none)'}</td></tr>
      <tr><td><strong>Message</strong></td><td>${message || '(none)'}</td></tr>

      <tr style="background-color: #f5f5f5;">
        <td><strong>Submitted By</strong></td><td>${submittedBy}</td>
      </tr>
      <tr style="background-color: #f5f5f5;">
        <td><strong>Submitted At</strong></td><td>${new Date().toLocaleString()}</td>
      </tr>
    </table>
  `;

  const emailResult = await sendResendEmail({
    subject: `New Triage: ${patientName} - ${subject || 'No Subject'}`,
    html: emailHtml,
  });

  return NextResponse.json({
    success: true,
    emailStatus: emailResult.ok ? 'sent' : 'failed',
    emailReason: emailResult.reason,
  });
}
