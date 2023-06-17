import React, { useState, useEffect } from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/specific/Navbar";
import AuthForm from "./components/specific/AuthForm";
import Dashboard from "./pages/Dashboard";
import UserContext from "./contexts/UserContext";
import Faq from "./pages/Faq";
import About from "./pages/About";
import Footer from "./components/common/Footer";
import ResetPassword from "./pages/ResetPassword";
import { Box } from "@chakra-ui/react";
import TesPage from "./pages/TesPage";
import TestPageTwo from "./pages/TestPageTwo";
import BackToTopButton from "./components/specific/BackToTopButton";

const RestrictedRoute = ({ children, value }) => {
  return value.isLoggedIn ? <Navigate to="/dashboard" /> : children;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storedUser = localStorage.getItem("user");
  let parsedUser = null;

  if (storedUser && storedUser !== "undefined") {
    try {
      parsedUser = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error parsing stored user data:", error);
    }
  }

  const [user, setUser] = useState(parsedUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    } else {
      console.log("No stored user data found or stored data is 'undefined'");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // This will be your routes configuration
  const routing = useRoutes([
    { path: "/", element: <RestrictedRoute value={{ isLoggedIn }}><Home /></RestrictedRoute> },
    { path: "/login", element: isLoggedIn ? <Navigate to="/dashboard" /> : <Login /> },
    { path: "/register", element: isLoggedIn ? <Navigate to="/dashboard" /> : <AuthForm /> },
    { path: "/dashboard", element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" /> },
    { path: "/faq", element: <RestrictedRoute value={{ isLoggedIn }}><Faq /></RestrictedRoute> },
    { path: "/about", element: <RestrictedRoute value={{ isLoggedIn }}><About /></RestrictedRoute> },
    { path: "/reset-password/:token", element: <RestrictedRoute value={{ isLoggedIn }}><ResetPassword /></RestrictedRoute> },
    { path: "/test", element: <RestrictedRoute value={{ isLoggedIn }}><TesPage /></RestrictedRoute> },
    { path: "/testtwo", element: <RestrictedRoute value={{ isLoggedIn }}><TestPageTwo /></RestrictedRoute> },
  ]);

  return (
    <Box>
      <UserContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, user, setUser }}
      >
        <Box>
          <Navbar />
          {routing}
          <BackToTopButton />
          <Footer />
        </Box>
      </UserContext.Provider>
    </Box>
  );
};

export default App;
