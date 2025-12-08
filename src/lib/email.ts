// Email service using Resend API

interface EmailMessage {
  subject: string;
  html: string;
  replyTo?: string;
  from?: string;
  to?: string[];
}

interface EmailResult {
  ok: boolean;
  reason: string;
}

export async function sendResendEmail(message: EmailMessage): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, reason: 'RESEND_API_KEY not configured' };
  }

  const defaultTo = ['peter@clarkstreethealth.com', 'delivered@resend.dev'];

  const payload = {
    from: message.from || 'Heritage Surgical <onboarding@resend.dev>',
    to: message.to || defaultTo,
    subject: message.subject,
    html: message.html,
    reply_to: message.replyTo,
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true, reason: 'Email sent successfully' };
    } else {
      const errorData = await response.text();
      return { ok: false, reason: `API error: ${response.status} - ${errorData}` };
    }
  } catch (error) {
    return { ok: false, reason: `Network error: ${error}` };
  }
}
