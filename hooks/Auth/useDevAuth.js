// src/auth/useDevAuth.js
import { useCallback, useMemo, useState } from "react";

// In-memory "DB" (dev only). Resets on reload / app restart.
const devUsers = {}; // { [email]: { email, password } }

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function useDevAuth() {
  const [user, setUser] = useState(null); // { email } | null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearError = useCallback(() => setError(""), []);

  const signup = useCallback(async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const e = normalizeEmail(email);
      const p = String(password || "");

      if (!e.includes("@")) throw new Error("Enter a valid email.");
      if (p.length < 6) throw new Error("Password must be at least 6 characters.");

      if (devUsers[e]) throw new Error("Account already exists. Please sign in.");

      devUsers[e] = { email: e, password: p };
      setUser({ email: e }); // auto-login after signup
      return { email: e };
    } catch (err) {
      const msg = err?.message || "Signup failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const e = normalizeEmail(email);
      const p = String(password || "");

      const record = devUsers[e];
      if (!record) throw new Error("No account found. Please sign up.");
      if (record.password !== p) throw new Error("Incorrect password.");

      setUser({ email: e });
      return { email: e };
    } catch (err) {
      const msg = err?.message || "Login failed";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return useMemo(
    () => ({
      user,
      loading,
      error,
      signup,
      login,
      logout,
      clearError,
    }),
    [user, loading, error, signup, login, logout, clearError]
  );
}
