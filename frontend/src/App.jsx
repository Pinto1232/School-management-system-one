import React from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/FooterCustomizable/Footer'
import DashboardFooter from './components/common/DashboardFooter'
import BackToTopButton from './components/BackToTopButton/BackToTopButton'
import { UserProvider } from './contexts/UserContext'
import { useRoutes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/AuthTentication/Login'
import AuthForm from './components/AuthTentication/AuthForm'
import Dashboard from './pages/dashboard/Dashboard'
import Faq from './pages/Faq'
import About from './pages/About'
import ResetPassword from './components/AuthTentication/ResetPassword'
import ForgetPassword from './components/AuthTentication/ForgetPassowrd'

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

const MemoizedApp = React.memo(App)
export default MemoizedApp
