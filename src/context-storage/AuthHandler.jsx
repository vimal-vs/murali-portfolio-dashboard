import React, { createContext, useState } from 'react';
const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogout() {
    localStorage.clear()
    window.location.reload();
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, setToken, userData, setUserData, token, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
