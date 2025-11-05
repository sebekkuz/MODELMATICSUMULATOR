// frontend/src/lib/net.ts
export const API_BASE: string = (import.meta as any).env?.VITE_API_URL ?? '';

export function buildUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const res = await fetch(buildUrl(path), init);
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${text}`);
  }
  return res;
}

export function wsUrl(path = '/ws'): string {
  const base = API_BASE || window.location.origin;
  return base.replace(/^http/, 'ws') + path;
}

// @ts-ignore
window.API_BASE = API_BASE;
