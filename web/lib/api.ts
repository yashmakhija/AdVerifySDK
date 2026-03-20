export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://ads.paidappstore.com/api';

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export async function api<T = unknown>(path: string, opts: {
  method?: string;
  body?: unknown;
  token?: string;
} = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts.token) headers['Authorization'] = `Bearer ${opts.token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method: opts.method || 'GET',
    headers,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new ApiError(
      err.error || err.message || `HTTP ${res.status}`,
      err.code || '',
      res.status
    );
  }

  return res.json();
}
