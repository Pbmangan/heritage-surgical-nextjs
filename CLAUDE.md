# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start development server (http://localhost:3000)
bun run build        # Production build
bun run start        # Run production build
bun run lint         # Run ESLint
```

## Architecture

This is a Next.js 14 App Router application simulating a legacy medical portal with intentional UX "friction" to mimic 2000s-era PHP behavior.

### Key Directories

- `src/app/` - Next.js App Router pages and API routes
- `src/components/` - Shared React components (Header, Footer, FrictionLink, LegacyProgress)
- `src/lib/` - Core utilities:
  - `friction.ts` - Server-side artificial delays and legacy behavior simulation
  - `email.ts` - Resend API integration for notifications
  - `providers.ts` - Provider data and deterministic appointment slot generation
- `src/app/new-portal/` - EHR portal mock (single-page app with view state management)

### Main User Flows

1. **Patient Intake** (`/intake`) - Multi-field intake form → `/api/intake` → success page
2. **Appointment Scheduling** (`/schedule`) - 3-step wizard:
   - Step 1: Service/visit type selection
   - Step 2: Provider/slot selection with filtering
   - Step 3: Patient info and insurance → `/api/schedule` → success page

### EHR Portal Mock (`/new-portal`)

A client-side SPA simulating an electronic health records system:
- View state machine defined in `types.ts` (`ViewState` union type)
- Mock data in `data/patients.ts`, `data/medications.ts`, `data/drugs.ts`
- Screen components in `components/views/`

### Friction System

The app intentionally includes legacy behavior simulation:
- 45% chance of 1-2 second server delays on page loads
- 28% chance of popup blockers on navigation (client-side)
- 250-500ms artificial delays on form submissions
- Deterministic slot generation uses seeded RNG based on date (consistent within a day)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Resend.com API key for email notifications (optional) |

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- CSS (intentionally retro styling, no CSS frameworks)
- Resend API for emails
