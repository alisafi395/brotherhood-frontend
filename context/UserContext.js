// context/UserContext.js
import React, { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // optional: store whole auth response too (message, etc.)
  const [authMeta, setAuthMeta] = useState(null);

  const setUserFromLoginResponse = (data) => {
    // data shape: { message, user }
    setUser(data?.user || null);
    setAuthMeta({ message: data?.message || "" });
  };

  const logout = () => {
    setUser(null);
    setAuthMeta(null);
  };

  const value = useMemo(
    () => ({
      user,
      setUser, // if you want to directly set user
      authMeta,
      setAuthMeta,
      setUserFromLoginResponse,
      logout,
      isLoggedIn: !!user,
    }),
    [user, authMeta]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside a <UserProvider />");
  return ctx;
}
