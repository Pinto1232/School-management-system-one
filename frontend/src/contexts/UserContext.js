// src/contexts/UserContext.js
import { createContext } from 'react';

const UserContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    user: null,
    setUser: () => { },
});

export default UserContext;


