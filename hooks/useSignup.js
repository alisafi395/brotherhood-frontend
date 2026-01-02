import { useState, useCallback } from "react";
import { signup } from "../api/auth";

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const signupUser = useCallback(async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await signup(payload);
      setData(response);
      return response; // 👈 important so caller can await it
    } catch (err) {
      setError(err.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    signupUser,
    loading,
    error,
    data,
  };
}
