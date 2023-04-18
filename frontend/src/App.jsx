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
import ForgetPassowrd from './pages/ForgetPassowrd';
import Footer from './components/common/Footer';
import ResetPassword from './pages/ResetPassword';
import { Box } from '@chakra-ui/react';
import TesPage from './pages/TesPage';

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
    <Box>
      <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
        <Box>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<AuthForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/about" element={<About />} />
            <Route path="/forgetPassword" element={<ForgetPassowrd />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/test" element={<TesPage />} />
          </Routes>
          <Footer />
        </Box>
      </UserContext.Provider>
    </Box>
  )
}

export default App
