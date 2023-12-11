import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);