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
  const priorityColor = rating?.includes('Urgent') ? '#d32f2f' : rating?.includes('Priority') ? '#f57c00' : '#388e3c';

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px;">
      <h2 style="color: #3f51b5; margin-bottom: 20px;">New Triage Entry</h2>

      <table border="0" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #3f51b5; color: white;">
          <th colspan="2" style="text-align: left; padding: 10px;">Patient</th>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="width: 120px;"><strong>Name</strong></td>
          <td>${patientName}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td><strong>DOB</strong></td>
          <td>${patientDob}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td><strong>Patient ID</strong></td>
          <td>${patientId}</td>
        </tr>
      </table>

      <table border="0" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #3f51b5; color: white;">
          <th colspan="2" style="text-align: left; padding: 10px;">Route</th>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="width: 120px;"><strong>User</strong></td>
          <td>${user || '<em>(not assigned)</em>'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td><strong>Reason</strong></td>
          <td>${reason || '<em>(none)</em>'}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td><strong>Status</strong></td>
          <td>${status}</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td><strong>Priority</strong></td>
          <td><span style="background-color: ${priorityColor}; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${rating}</span></td>
        </tr>
      </table>

      <table border="0" cellpadding="8" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #3f51b5; color: white;">
          <th colspan="2" style="text-align: left; padding: 10px;">Subject &amp; Message</th>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="width: 120px;"><strong>Subject</strong></td>
          <td><strong>${subject || '<em>(no subject)</em>'}</strong></td>
        </tr>
        <tr>
          <td style="vertical-align: top;"><strong>Message</strong></td>
          <td style="white-space: pre-wrap;">${message || '<em>(no message)</em>'}</td>
        </tr>
      </table>

      <div style="background-color: #f5f5f5; padding: 12px; border-radius: 4px; font-size: 12px; color: #666;">
        <strong>Submitted By:</strong> ${submittedBy}<br/>
        <strong>Submitted At:</strong> ${new Date().toLocaleString()}
      </div>
    </div>
  `;

  const emailResult = await sendResendEmail({
    subject: `Triage [${rating}]: ${patientName} - ${subject || 'No Subject'}`,
    html: emailHtml,
  });

  return NextResponse.json({
    success: true,
    emailStatus: emailResult.ok ? 'sent' : 'failed',
    emailReason: emailResult.reason,
  });
}
