import React, { useEffect } from "react";
import { useRoutes, Navigate, useLocation, useNavigate } from "react-router-dom";
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
import ForgetPassword from "./pages/ForgetPassowrd";


const App = () => {
  const navigate = useNavigate();
  const location = useLocation();



  const routing = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <AuthForm /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/faq", element: <Faq /> },
    { path: "/about", element: <About /> },
    { path: "/reset-password/:token", element: <ResetPassword /> },
    { path: "/forgetPassword", element: <ForgetPassword /> },
    { path: "/test", element: <TesPage /> },
    { path: "/testtwo", element: <TestPageTwo /> },
  ]);

  // Check if the current route is not the dashboard
  const showFooter = location.pathname !== '/dashboard';

  return (
    <UserProvider>
      <Box>
        <Navbar />
        {routing}
        <BackToTopButton />
        {showFooter && <Footer />}
      </Box>
    </UserProvider>
  );
};

export default App;