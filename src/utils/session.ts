import { ReadingSession, ReadingType } from '@/types/tarot';

function toUrlSafe(b64: string): string {
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function fromUrlSafe(safe: string): string {
  const b64 = safe.replace(/-/g, '+').replace(/_/g, '/');
  const pad = (4 - (b64.length % 4)) % 4;
  return b64 + '='.repeat(pad);
}

export function createSession(type: ReadingType): string {
  const session: ReadingSession = {
    type,
    paidAt: Date.now(),
    drawnCards: [],
    reversals: [],
  };
  return toUrlSafe(btoa(encodeURIComponent(JSON.stringify(session))));
}

export function parseSession(sessionId: string): ReadingSession | null {
  try {
    const json = decodeURIComponent(atob(fromUrlSafe(sessionId)));
    const session = JSON.parse(json) as ReadingSession;
    const twoHours = 2 * 60 * 60 * 1000;
    if (Date.now() - session.paidAt > twoHours) return null;
    return session;
  } catch {
    return null;
  }
}

export function encodeSession(session: ReadingSession): string {
  return toUrlSafe(btoa(encodeURIComponent(JSON.stringify(session))));
}
