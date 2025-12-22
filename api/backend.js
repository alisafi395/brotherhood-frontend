export const BACKEND_URL = "http://localhost:3000";

export async function syncUserWithBackend(idToken) {
  const res = await fetch(`${BACKEND_URL}/auth/firebase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Backend auth failed");
  return data; // { ok: true, user: {...} }
}
