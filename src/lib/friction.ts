// Server-side friction utilities to simulate legacy PHP behavior

export async function applyServerFriction(): Promise<void> {
  // 45% chance of random 1-2 second delay
  if (Math.random() < 0.45) {
    const delay = 1000 + Math.random() * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
  }
}

export async function applyFormSubmissionDelay(): Promise<void> {
  // Simulate file-writing overhead with 250-500ms delay
  const delay = 250 + Math.random() * 250;
  await new Promise(resolve => setTimeout(resolve, delay));
}

export async function applyScheduleSubmissionDelay(): Promise<void> {
  // Simulate processing delay with 200-450ms
  const delay = 200 + Math.random() * 250;
  await new Promise(resolve => setTimeout(resolve, delay));
}

// Generate cache-busting query params like PHP does
export function getCacheBuster(): string {
  return `?cachebuster=${Date.now()}&rev=${Math.floor(Math.random() * 100000)}`;
}

// Generate HTML comment bloat (30% chance returns bloated content marker)
export function shouldBloatResponse(): boolean {
  return Math.random() < 0.30;
}

// Generate bloat comments
export function generateBloatComments(): string {
  return '<!-- legacy cache clearing comment -->'.repeat(140);
}
