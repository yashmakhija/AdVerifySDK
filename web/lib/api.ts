const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://ads.paidappstore.com/api';

export async function api<T = unknown>(path: string, opts: {
  method?: string;
  body?: unknown;
  token?: string;
} = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts.token) headers['Authorization'] = `Basic ${opts.token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }

  return res.json();
}
