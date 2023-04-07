import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"
import Home from "../.././frontend/src/pages/Home"
import Login from "../.././frontend/src/pages/Login"
import Navbar from "../src/components/specific/Navbar"
import AuthForm from './components/specific/AuthForm'
import Dashboard from './pages/Dashboard'
import UserContext from './contexts/UserContext';
import Faq from './pages/Faq';
import About from './pages/About';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storedUser = localStorage.getItem('user');
  let parsedUser = null;

  if (storedUser && storedUser !== 'undefined') {
    try {
      parsedUser = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  }

  const [user, setUser] = useState(parsedUser);

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log('User data successfully retrieved and set:', parsedUser);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    } else {
      console.log("No stored user data found or stored data is 'undefined'");
    }
  }, []);
  


  return (
    <div>
      <UserContext.Provider  value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<AuthForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<Faq/>} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </div>
  )
}

export default App
