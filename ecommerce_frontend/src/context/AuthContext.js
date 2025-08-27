// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import api, { setAuthToken } from "../services/api";
import { jwtDecode } from "jwt-decode";  // ✅ correct import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
  );
  const [user, setUser] = useState(() =>
    authTokens ? jwtDecode(authTokens.access) : null   // ✅ changed
  );

  useEffect(() => {
    if (authTokens) setAuthToken(authTokens.access);
  }, [authTokens]);

  const login = async (username, password) => {
    const res = await api.post("token/", { username, password });
    setAuthTokens(res.data);
    setUser(jwtDecode(res.data.access));  // ✅ changed
    localStorage.setItem("authTokens", JSON.stringify(res.data));
    setAuthToken(res.data.access);
    return res;
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
