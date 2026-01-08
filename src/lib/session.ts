// Session management utilities for mock authentication

export const SESSION_CONFIG = {
  COOKIE_NAME: 'CCSMMSID',
  STORAGE_KEY: 'portal_session',
  EXPIRY_MINUTES: 30,
  COOKIE_PATH: '/', // Must be '/' so cookie is sent to /api/session
} as const;

export interface PortalSession {
  token: string;
  userId: string;
  practiceId: string;
  practiceName: string;
  loginTimestamp: number;
  expiresAt: number;
}

/**
 * Generate a session token in format: <timestamp>.<randomHex>.<userId>
 * This format allows client-side expiration checking without an API call
 */
export function generateSessionToken(userId: string): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const randomBytes = crypto.randomUUID().replace(/-/g, '').substring(0, 12);
  return `${timestamp}.${randomBytes}.${userId.toUpperCase()}`;
}

/**
 * Parse a session token to extract its components
 */
export function parseSessionToken(token: string): { timestamp: number; randomId: string; userId: string } | null {
  const parts = token.split('.');
  if (parts.length !== 3) return null;

  const timestamp = parseInt(parts[0], 10);
  if (isNaN(timestamp)) return null;

  return {
    timestamp,
    randomId: parts[1],
    userId: parts[2],
  };
}

/**
 * Check if a token has expired based on its embedded timestamp
 */
export function isTokenExpired(token: string, expiryMinutes: number = SESSION_CONFIG.EXPIRY_MINUTES): boolean {
  const parsed = parseSessionToken(token);
  if (!parsed) return true;

  const expiresAt = parsed.timestamp + (expiryMinutes * 60);
  const now = Math.floor(Date.now() / 1000);
  return now > expiresAt;
}

/**
 * Get session from localStorage (client-side only)
 */
export function getStoredSession(): PortalSession | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(SESSION_CONFIG.STORAGE_KEY);
    if (!stored) return null;

    const session = JSON.parse(stored) as PortalSession;

    // Check if expired
    const now = Math.floor(Date.now() / 1000);
    if (session.expiresAt <= now) {
      localStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

/**
 * Store session in localStorage (client-side only)
 */
export function storeSession(session: PortalSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SESSION_CONFIG.STORAGE_KEY, JSON.stringify(session));
}

/**
 * Clear session from localStorage (client-side only)
 */
export function clearStoredSession(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SESSION_CONFIG.STORAGE_KEY);
}

/**
 * Get cookie value by name (client-side only)
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
