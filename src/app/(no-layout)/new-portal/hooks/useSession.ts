'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  SESSION_CONFIG,
  getStoredSession,
  storeSession,
  clearStoredSession,
  type PortalSession,
} from '@/lib/session';

interface UseSessionReturn {
  session: PortalSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  createSession: (userId: string, password: string) => Promise<PortalSession | null>;
  validateSession: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<PortalSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    const stored = getStoredSession();
    if (stored) {
      setSession(stored);
    }
    setIsLoading(false);
  }, []);

  // Create session via API (called after successful login)
  const createSession = useCallback(async (userId: string, password: string): Promise<PortalSession | null> => {
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, password }),
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      if (data.success && data.session) {
        setSession(data.session);
        storeSession(data.session);
        return data.session;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  // Validate session via API
  const validateSession = useCallback(async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/session', { method: 'GET' });

      if (!response.ok) {
        setSession(null);
        clearStoredSession();
        return false;
      }

      return true;
    } catch {
      setSession(null);
      clearStoredSession();
      return false;
    }
  }, []);

  // Logout - clear session via API and localStorage
  const logout = useCallback(async (): Promise<void> => {
    try {
      await fetch('/api/session', { method: 'DELETE' });
    } finally {
      setSession(null);
      clearStoredSession();
    }
  }, []);

  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    createSession,
    validateSession,
    logout,
  };
}
