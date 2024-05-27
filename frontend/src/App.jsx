import React from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/common/Footer'
import DashboardFooter from './components/common/DashboardFooter'
import BackToTopButton from './components/specific/BackToTopButton'
import { UserProvider } from './contexts/UserContext'
import { useRoutes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import AuthForm from './components/forms/AuthForm'
import Dashboard from './pages/dashboard/Dashboard'
import Faq from './pages/Faq'
import About from './pages/About'
import ResetPassword from './pages/ResetPassword'
import ForgetPassword from './pages/ForgetPassowrd'


const theme = createTheme()

const App = () => {
  const location = useLocation()

  const routing = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <AuthForm /> },
    { path: '/dashboard/*', element: <Dashboard /> },
    { path: '/faq', element: <Faq /> },
    { path: '/about', element: <About /> },
    { path: '/reset-password/:token', element: <ResetPassword /> },
    { path: '/forgetPassword', element: <ForgetPassword /> },
  ])

  const showFooter = location.pathname !== '/dashboard'
  const showDashboardFooter = location.pathname === '/dashboard'

  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          <Navbar />
          {routing}
          <BackToTopButton />
          {showFooter && <Footer />}
          {showDashboardFooter && <DashboardFooter />}
        </Box>
      </ThemeProvider>
    </UserProvider>
  )
}

const MemoizedApp = React.memo(App);
export default MemoizedApp;
