import React, { useState, useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/specific/Navbar";
import AuthForm from "./components/specific/AuthForm";
import Dashboard from "./pages/dashboard/Dashboard";
import UserContext from "./contexts/UserContext";
import Faq from "./pages/Faq";
import About from "./pages/About";
import Footer from "./components/common/Footer";
import ResetPassword from "./pages/ResetPassword";
import { Box } from "@chakra-ui/react";
import TesPage from "./pages/TesPage";
import TestPageTwo from "./pages/TestPageTwo";
import BackToTopButton from "./components/specific/BackToTopButton";
//Test
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const storedUser = localStorage.getItem("user");
  const location = useLocation();
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
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <AuthForm /> },
    { path: "/dashboard", element: isLoggedIn ? <Dashboard /> : <Login /> },
    { path: "/faq", element: <Faq /> },
    { path: "/about", element: <About /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
    { path: "/test", element: <TesPage /> },
    { path: "/testtwo", element: <TestPageTwo /> },
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
          { location.pathname !== '/dashboard' && <Footer /> }
        </Box>
      </UserContext.Provider>
    </Box>
  );
};

export default App;
