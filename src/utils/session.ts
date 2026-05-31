import { ReadingSession, ReadingType } from '@/types/tarot';

export function createSession(type: ReadingType): string {
  const session: ReadingSession = {
    type,
    paidAt: Date.now(),
    drawnCards: [],
    reversals: [],
  };
  return btoa(encodeURIComponent(JSON.stringify(session)));
}

export function parseSession(sessionId: string): ReadingSession | null {
  try {
    const json = decodeURIComponent(atob(sessionId));
    const session = JSON.parse(json) as ReadingSession;
    const twoHours = 2 * 60 * 60 * 1000;
    if (Date.now() - session.paidAt > twoHours) return null;
    return session;
  } catch {
    return null;
  }
}

export function encodeSession(session: ReadingSession): string {
  return btoa(encodeURIComponent(JSON.stringify(session)));
}
