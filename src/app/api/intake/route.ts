import { NextRequest, NextResponse } from 'next/server';
import { applyFormSubmissionDelay } from '@/lib/friction';
import { sendResendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  // Apply artificial delay to simulate legacy PHP behavior
  await applyFormSubmissionDelay();

  const formData = await request.formData();

  // Extract form fields
  const fullName = formData.get('full_name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const mainIssue = formData.get('main_issue') as string;

  // Validation
  const errors: string[] = [];

  if (!fullName?.trim()) {
    errors.push('Full name is required');
  }
  if (!email?.trim()) {
    errors.push('Email address is required');
  }
  if (!phone?.trim()) {
    errors.push('Phone number is required');
  }
  if (!mainIssue?.trim()) {
    errors.push('Main issue/concern is required');
  }

  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors });
  }

  // Build submission payload
  const submission = {
    full_name: fullName,
    email,
    phone,
    location: formData.get('location') || '',
    surgeon: formData.get('surgeon') || '',
    surgery_date: formData.get('surgery_date') || '',
    surgery_time: formData.get('surgery_time') || '',
    main_issue: mainIssue,
    days_since: formData.get('days_since') || '',
    pain_level: formData.get('pain_level') || '',
    interfere: formData.getAll('interfere'),
    length_of_symptoms: formData.get('length_of_symptoms') || '',
    interventions: formData.get('interventions') || '',
    imaging: formData.get('imaging') || '',
    imaging_results: formData.get('imaging_results') || '',
    previous_surgery: formData.get('previous_surgery') || '',
    surgery_details: formData.get('surgery_details') || '',
    arrival_time: formData.get('arrival_time') || '',
    iv_and_prep: formData.get('iv_and_prep') || '',
    anesthesia_questions: formData.get('anesthesia_questions') || '',
    postop_notes: formData.get('postop_notes') || '',
    captured_at: new Date().toISOString(),
  };

  // Log submission (in production you'd store this in a database)
  console.log('Intake submission:', JSON.stringify(submission, null, 2));

  // Additional delay to simulate file-writing overhead
  await new Promise(resolve => setTimeout(resolve, 250 + Math.random() * 250));

  // Build and send email
  const emailHtml = `
    <h2>New Patient Intake Submission</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <tr><td><strong>Name</strong></td><td>${fullName}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
      <tr><td><strong>Main Issue</strong></td><td>${mainIssue}</td></tr>
      <tr><td><strong>Pain Level</strong></td><td>${submission.pain_level}/10</td></tr>
      <tr><td><strong>Submitted</strong></td><td>${submission.captured_at}</td></tr>
    </table>
    <p><em>Full details available in system logs.</em></p>
  `;

  const emailResult = await sendResendEmail({
    subject: `New Patient Intake: ${fullName}`,
    html: emailHtml,
    replyTo: email,
  });

  return NextResponse.json({
    success: true,
    emailStatus: emailResult.ok ? 'sent' : 'failed',
  });
}
