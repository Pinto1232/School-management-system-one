import React, { useState, useEffect } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/specific/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { UserContext, UserProvider } from './contexts/UserContext.jsx';
import Faq from "./pages/Faq";
import About from "./pages/About";
import Footer from "./components/common/Footer";
import ResetPassword from "./pages/ResetPassword";
import { Box } from "@chakra-ui/react";
import TesPage from "./pages/TesPage";
import TestPageTwo from "./pages/TestPageTwo";
import BackToTopButton from "./components/specific/BackToTopButton";
import AuthForm from "./components/forms/AuthForm";



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
      <UserProvider value={{ isLoggedIn, setIsLoggedIn }}>
        <Box>
          <Navbar />
          {routing}
          <BackToTopButton />
          {isLoggedIn ? null : <Footer />}
        </Box>
      </UserProvider >
  );
};

export default App;
