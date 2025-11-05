export const API_URL = (import.meta.env.VITE_API_URL as string) || window.location.origin;

export async function apiPost(path: string, body?: any) {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json().catch(() => ({}));
}

export async function apiGet(path: string) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json().catch(() => ({}));
}

export function wsUrl() {
  const u = new URL(API_URL);
  u.protocol = u.protocol.replace("http", "ws");
  u.pathname = "/ws/sim";
  return u.toString();
}
