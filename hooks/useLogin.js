// src/hooks/Auth/useLogin.js
import { useState, useCallback } from "react";
import { login as loginApi } from "../api/auth";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    setError("");

    try {
      const data = await loginApi({
        email: (email || "").trim(),
        password: password || "",
      });
      return data; // expected: { message, user, token? }
    } catch (e) {
      const msg = e?.message || "Login failed";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error, setError };
}
