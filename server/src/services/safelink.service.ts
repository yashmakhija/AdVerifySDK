import { env } from '../config/env';

/**
 * wp-safelink bridge client.
 *
 * Wraps a URL in a monetized WordPress safelink (ad interstitial) via the
 * `safelink-bridge` plugin REST endpoint, e.g.
 *   POST https://mods.paidappstore.com/wp-json/safelink-bridge/v1/create  { url }
 *   -> { shortUrl | short_url | data.url | url }
 *
 * Designed to be non-blocking: if the bridge is not configured or the request
 * fails for any reason, the original URL is returned so the PIN flow never breaks.
 */
interface SafeLinkBridgeResponse {
  shortUrl?: string;
  short_url?: string;
  data?: { shortUrl?: string; short_url?: string; url?: string };
  url?: string;
}

export class SafelinkService {
  static async wrap(url: string): Promise<string> {
    if (!url) return url;
    if (!env.SAFELINK_BRIDGE_URL) return url; // feature disabled

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), env.SAFELINK_BRIDGE_TIMEOUT_MS);

    try {
      const res = await fetch(env.SAFELINK_BRIDGE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
        signal: controller.signal,
      });

      if (!res.ok) {
        console.warn(`[safelink] bridge request failed: ${res.status} ${res.statusText}`);
        return url;
      }

      const payload = (await res.json()) as SafeLinkBridgeResponse;
      const shortUrl =
        payload.shortUrl ||
        payload.short_url ||
        payload.data?.shortUrl ||
        payload.data?.short_url ||
        payload.data?.url ||
        payload.url ||
        null;

      if (!shortUrl) {
        console.warn('[safelink] bridge returned no short URL, using raw link');
        return url;
      }

      return shortUrl;
    } catch (err) {
      console.warn('[safelink] bridge call failed, using raw link:', (err as Error).message);
      return url;
    } finally {
      clearTimeout(timeout);
    }
  }
}
