import React, { useEffect } from "react";
import { useRoutes, Navigate, useLocation, useNavigate  } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/specific/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import { UserProvider, useUserContext } from './contexts/UserContext';
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
  const navigate = useNavigate();
  const { isLoggedIn } = useUserContext();
  const location = useLocation();
  

  useEffect(() => {
    if (isLoggedIn && location.pathname === '/login') {
      // Redirect to dashboard only if the user is on the login page
      navigate('/dashboard');
    } else if (!isLoggedIn && location.pathname === '/dashboard') {
      // Redirect to home if the user logs out and is currently on the dashboard
      navigate('/');
    }
  }, [isLoggedIn, navigate, location.pathname]);
  


  const routing = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <AuthForm /> },
    { path: "/dashboard", element: isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace /> },
    { path: "/faq", element: <Faq /> },
    { path: "/about", element: <About /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
    { path: "/test", element: <TesPage /> },
    { path: "/testtwo", element: <TestPageTwo /> },
  ]);

  return (
    <UserProvider>
      <Box>
        <Navbar />
        {routing}
        <BackToTopButton />
        {isLoggedIn ? null : <Footer />}
      </Box>
    </UserProvider>
  );
};

export default App;