# Heritage Surgical Associates - Next.js

A Next.js port of the PHP medical form application, designed to mimic the behavior and intentional "friction" of a legacy medical portal.

## Features

- **Retro 2000s Styling**: Intentionally dated UI with gradients, outset borders, and legacy patterns
- **Intentional Friction**: Random server delays, popup blockers, and loading states that simulate slow PHP behavior
- **Full Form Flows**:
  - Patient intake form with validation
  - 3-step appointment scheduling with dynamic slot generation
- **Email Integration**: Resend API for confirmation emails
- **Vercel-Ready**: Deploy directly to Vercel

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `RESEND_API_KEY` - Your Resend API key for email notifications

## Friction Features

This app intentionally includes "friction" to simulate legacy PHP behavior:

- **Server-side delays**: 45% chance of 1-2 second random delays on page loads
- **Client-side popup**: 28% chance of "Best viewed in IE6" popup on navigation
- **Form submission delays**: 250-500ms artificial delays on form submissions
- **Loading states**: Visible "please wait" messages during processing
- **Cache-busting**: Dynamic query parameters on placeholder images

## Pages

- `/` - Home page with hero and features
- `/services` - Service listings with wait times
- `/providers` - Provider directory
- `/contact` - Contact information and locations
- `/intake` - New patient intake form
- `/schedule` - 3-step appointment scheduling flow

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `RESEND_API_KEY` | Resend.com API key | No (emails will fail gracefully) |

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- CSS (no frameworks - intentionally retro)
- Resend API for emails
