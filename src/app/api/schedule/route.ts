import { NextRequest, NextResponse } from 'next/server';
import { applyScheduleSubmissionDelay } from '@/lib/friction';
import { sendResendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  // Apply artificial delay to simulate legacy PHP behavior
  await applyScheduleSubmissionDelay();

  const formData = await request.formData();

  // Extract form fields
  const firstName = formData.get('first_name') as string;
  const lastName = formData.get('last_name') as string;
  const dobMonth = formData.get('dob_month') as string;
  const dobDay = formData.get('dob_day') as string;
  const dobYear = formData.get('dob_year') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const reasonDetails = formData.get('reason_details') as string;
  const noInsurance = formData.get('no_insurance') === 'yes';

  // Slot info
  const slotDate = formData.get('slot_date') as string;
  const slotTime = formData.get('slot_time') as string;
  const slotProvider = formData.get('slot_provider') as string;
  const slotCredentials = formData.get('slot_credentials') as string;
  const slotSpecialty = formData.get('slot_specialty') as string;
  const slotLocation = formData.get('slot_location') as string;
  const slotAddress = formData.get('slot_address') as string;
  const slotPhone = formData.get('slot_phone') as string;

  // Validation
  const errors: string[] = [];

  if (!firstName?.trim()) {
    errors.push('First name is required');
  }
  if (!lastName?.trim()) {
    errors.push('Last name is required');
  }
  if (!dobMonth || !dobDay || !dobYear) {
    errors.push('Complete date of birth is required');
  } else {
    // Validate DOB is a real date
    const month = parseInt(dobMonth);
    const day = parseInt(dobDay);
    const year = parseInt(dobYear);
    const testDate = new Date(year, month - 1, day);
    if (
      testDate.getFullYear() !== year ||
      testDate.getMonth() !== month - 1 ||
      testDate.getDate() !== day
    ) {
      errors.push('Invalid date of birth');
    }
  }
  if (!phone?.trim()) {
    errors.push('Phone number is required');
  }
  if (!email?.trim()) {
    errors.push('Email address is required');
  }
  if (!reasonDetails?.trim()) {
    errors.push('Reason for visit is required');
  }
  if (!slotDate || !slotTime || !slotProvider) {
    errors.push('Appointment slot information is missing');
  }

  // Insurance validation (unless no_insurance is checked)
  if (!noInsurance) {
    if (!formData.get('insurance_name')) {
      errors.push('Insurance company name is required');
    }
    if (!formData.get('plan_name')) {
      errors.push('Plan name is required');
    }
    if (!formData.get('subscriber_id')) {
      errors.push('Subscriber ID is required');
    }
    if (!formData.get('group_number')) {
      errors.push('Group number is required');
    }
  }

  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors });
  }

  // Format DOB
  const dob = `${dobYear}-${String(dobMonth).padStart(2, '0')}-${String(dobDay).padStart(2, '0')}`;

  // Build submission payload
  const submission = {
    first_name: firstName,
    last_name: lastName,
    dob,
    phone,
    email,
    email_opt_in: formData.get('email_opt_in') === 'yes',
    carrier: formData.get('carrier') || '',
    no_insurance: noInsurance,
    insurance_name: noInsurance ? null : formData.get('insurance_name'),
    plan_name: noInsurance ? null : formData.get('plan_name'),
    subscriber_id: noInsurance ? null : formData.get('subscriber_id'),
    group_number: noInsurance ? null : formData.get('group_number'),
    reason_details: reasonDetails,
    slot: {
      date: slotDate,
      time: slotTime,
      provider: slotProvider,
      credentials: slotCredentials,
      specialty: slotSpecialty,
      location: slotLocation,
      address: slotAddress,
      phone: slotPhone,
    },
    filters_used: {
      service_line: formData.get('service_line') || '',
      new_patient: formData.get('new_patient') || '',
      visit_reason: formData.get('visit_reason') || '',
      day_filter: formData.get('day_filter') || '',
      provider_filter: formData.get('provider_filter') || '',
      location_filter: formData.get('location_filter') || '',
    },
    captured_at: new Date().toISOString(),
  };

  // Log submission (in production you'd store this in a database)
  console.log('Schedule submission:', JSON.stringify(submission, null, 2));

  // Additional delay to simulate processing
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 250));

  // Build and send email
  const emailHtml = `
    <h2>New Appointment Scheduled</h2>
    <h3>Patient Information</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <tr><td><strong>Name</strong></td><td>${firstName} ${lastName}</td></tr>
      <tr><td><strong>DOB</strong></td><td>${dob}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
    </table>

    <h3>Appointment Details</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <tr><td><strong>Provider</strong></td><td>${slotProvider}, ${slotCredentials}</td></tr>
      <tr><td><strong>Specialty</strong></td><td>${slotSpecialty}</td></tr>
      <tr><td><strong>Date/Time</strong></td><td>${slotDate} at ${slotTime}</td></tr>
      <tr><td><strong>Location</strong></td><td>${slotLocation}</td></tr>
      <tr><td><strong>Address</strong></td><td>${slotAddress}</td></tr>
    </table>

    <h3>Insurance</h3>
    <p>${noInsurance ? 'Self-Pay / No Insurance' : `${submission.insurance_name} - ${submission.plan_name}`}</p>

    <h3>Reason for Visit</h3>
    <p>${reasonDetails}</p>

    <p><em>Submitted: ${submission.captured_at}</em></p>
  `;

  const emailResult = await sendResendEmail({
    subject: `Appointment Scheduled: ${firstName} ${lastName} - ${slotDate} ${slotTime}`,
    html: emailHtml,
    replyTo: email,
  });

  return NextResponse.json({
    success: true,
    emailStatus: emailResult.ok ? 'sent' : 'failed',
  });
}
