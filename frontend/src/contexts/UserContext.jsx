import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('user', JSON.stringify(user));
  }, [isLoggedIn, user]);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
