import { NextRequest, NextResponse } from 'next/server';
import {
  generateSessionToken,
  isTokenExpired,
  parseSessionToken,
  SESSION_CONFIG,
  type PortalSession,
} from '@/lib/session';

// In-memory session store (resets on server restart - fine for testing)
const activeSessions = new Map<string, { userId: string; createdAt: number }>();

// Hardcoded credentials (matching existing login components)
const VALID_CREDENTIALS = {
  userId: 'CLARKS',
  password: 'adm4400',
};

// Practice info for the mock session
const PRACTICE_INFO = {
  id: 'HM001',
  name: 'Heritage Medical',
};

/**
 * POST /api/session - Create a new session (login)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, password } = body;

    // Validate credentials
    if (!userId || userId.toUpperCase() !== VALID_CREDENTIALS.userId) {
      return NextResponse.json(
        { success: false, error: 'Invalid User ID' },
        { status: 401 }
      );
    }

    if (password !== VALID_CREDENTIALS.password) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Generate session
    const token = generateSessionToken(userId);
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + SESSION_CONFIG.EXPIRY_MINUTES * 60;

    // Store in memory
    activeSessions.set(token, {
      userId: userId.toUpperCase(),
      createdAt: now,
    });

    // Build session data
    const session: PortalSession = {
      token,
      userId: userId.toUpperCase(),
      practiceId: PRACTICE_INFO.id,
      practiceName: PRACTICE_INFO.name,
      loginTimestamp: now,
      expiresAt,
    };

    // Create response with cookie
    const response = NextResponse.json({ success: true, session });
    response.cookies.set(SESSION_CONFIG.COOKIE_NAME, token, {
      path: SESSION_CONFIG.COOKIE_PATH,
      maxAge: SESSION_CONFIG.EXPIRY_MINUTES * 60,
      sameSite: 'lax',
      httpOnly: false, // Client needs to read for auto-login check
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}

/**
 * GET /api/session - Validate current session
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_CONFIG.COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json(
      { valid: false, error: 'No session cookie' },
      { status: 401 }
    );
  }

  // Check token format and expiration
  if (isTokenExpired(token)) {
    activeSessions.delete(token);
    return NextResponse.json(
      { valid: false, error: 'Session expired' },
      { status: 401 }
    );
  }

  // Check if session exists in store
  const storedSession = activeSessions.get(token);
  if (!storedSession) {
    // Token is valid format and not expired, but not in our store
    // This can happen after server restart - accept it for testing convenience
    const parsed = parseSessionToken(token);
    if (parsed) {
      // Re-add to store
      activeSessions.set(token, {
        userId: parsed.userId,
        createdAt: parsed.timestamp,
      });

      return NextResponse.json({
        valid: true,
        userId: parsed.userId,
        practiceId: PRACTICE_INFO.id,
        practiceName: PRACTICE_INFO.name,
      });
    }

    return NextResponse.json(
      { valid: false, error: 'Invalid session' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    valid: true,
    userId: storedSession.userId,
    practiceId: PRACTICE_INFO.id,
    practiceName: PRACTICE_INFO.name,
  });
}

/**
 * DELETE /api/session - Destroy session (logout)
 */
export async function DELETE(request: NextRequest) {
  const token = request.cookies.get(SESSION_CONFIG.COOKIE_NAME)?.value;

  if (token) {
    activeSessions.delete(token);
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_CONFIG.COOKIE_NAME, '', {
    path: SESSION_CONFIG.COOKIE_PATH,
    maxAge: 0, // Expire immediately
  });

  return response;
}
