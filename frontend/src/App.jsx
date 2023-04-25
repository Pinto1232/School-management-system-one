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
import Footer from './components/common/Footer';
import ResetPassword from './pages/ResetPassword';
import { Box } from '@chakra-ui/react';
import ForgetPassword from './pages/ForgetPassowrd';
import TesPage from './pages/TesPage';
import TestPageTwo from './pages/TestPageTwo';

const App = () => {

  // All this block of get the user details when loged on the dashboard
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
    const storedUser = localStorage.getItem('user');
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

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);




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
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/test" element={<TesPage />} />
            <Route path="/testtwo" element={<TestPageTwo />}/ >
          </Routes>
          <Footer/>
        </Box>
      </UserContext.Provider>
    </Box>
  )
}

export default App
