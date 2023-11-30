import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const Login = () => {
    // Implement your login logic here
    setLoggedIn(true);
  };

  const logout = () => {
    // Implement your logout logic here
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, Login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
