// Simple fetch wrapper with base URL and error handling
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, init) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`${init?.method || "GET"} ${path} failed: ${res.status}`);
  return res.json();
}

export const apiGet = (path) => request(path, { method: "GET" });