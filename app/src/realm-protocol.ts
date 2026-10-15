/** Protocol for the reviewed opaque-origin, allow-scripts-only Realm iframe. */
export const REALM_PROTOCOL = 'temple-realm-v1' as const;
export const REALM_PHASES = ['lobby', 'entering', 'session', 'paused', 'exiting', 'finished'] as const;
export type RealmPhase = typeof REALM_PHASES[number];
export interface RealmPreferences { voice: boolean; captions: boolean; particles: boolean; reduceMotion: boolean }
export type RealmChildMessage =
  | { protocol: typeof REALM_PROTOCOL; type: 'ready'; sessionId: string }
  | { protocol: typeof REALM_PROTOCOL; type: 'exit'; sessionId: string; reason: 'user' | 'host' }
  | { protocol: typeof REALM_PROTOCOL; type: 'phase'; sessionId: string; phase: RealmPhase };
export type RealmHostMessage =
  | { protocol: typeof REALM_PROTOCOL; type: 'init'; sessionId: string; preferences: RealmPreferences }
  | { protocol: typeof REALM_PROTOCOL; type: 'dispose' | 'pause' | 'resume' | 'exit'; sessionId: string };
export function createRealmSessionId(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), b => b.toString(16).padStart(2, '0')).join('');
}
export function isRealmSessionId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-f0-9]{32}$/.test(value);
}
function exact(value: Record<string, unknown>, keys: string[]): boolean {
  return Object.keys(value).length === keys.length && keys.every(k => Object.prototype.hasOwnProperty.call(value, k));
}
export function isRealmChildMessage(data: unknown, sessionId: string): data is RealmChildMessage {
  if (!isRealmSessionId(sessionId) || !data || typeof data !== 'object' || Array.isArray(data)) return false;
  const d = data as Record<string, unknown>;
  if (d.protocol !== REALM_PROTOCOL || d.sessionId !== sessionId) return false;
  if (d.type === 'ready') return exact(d, ['protocol', 'type', 'sessionId']);
  if (d.type === 'exit') return exact(d, ['protocol', 'type', 'sessionId', 'reason']) && (d.reason === 'user' || d.reason === 'host');
  if (d.type === 'phase') return exact(d, ['protocol', 'type', 'sessionId', 'phase']) && (REALM_PHASES as readonly unknown[]).includes(d.phase);
  return false;
}
/** Only call for an iframe actually configured sandbox="allow-scripts" without allow-same-origin. */
export function isTrustedRealmEvent(
  event: { origin: string; source: unknown; data: unknown },
  expectedFrameWindow: unknown,
  sessionId: string,
): boolean {
  return expectedFrameWindow != null && event.source === expectedFrameWindow && event.origin === 'null' && isRealmChildMessage(event.data, sessionId);
}
export function createRealmInit(sessionId: string, preferences: Partial<RealmPreferences> = {}): RealmHostMessage {
  if (!isRealmSessionId(sessionId)) throw new Error('Invalid Realm session ID');
  return { protocol: REALM_PROTOCOL, type: 'init', sessionId, preferences: {
    voice: false, captions: preferences.captions ?? true,
    particles: preferences.particles ?? true, reduceMotion: preferences.reduceMotion ?? false,
  }};
}
