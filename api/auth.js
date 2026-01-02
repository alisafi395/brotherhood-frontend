const API_BASE = "http://localhost:3000";

async function request(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // backend returns { message: "..." }
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export function signup(payload) {
  // payload: {email,password,name,age,city,profession,travelDistance,goals,availabilityBlocks}
  return request("/auth/signup", payload);
}

export function login(payload) {
  // payload: {email,password}
  return request("/auth/login", payload);
}
