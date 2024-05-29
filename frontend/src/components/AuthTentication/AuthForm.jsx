import React, { useState } from 'react';
import { Box, Typography, CircularProgress, Button, TextField, useTheme, Snackbar, Alert } from '@mui/material';
import useFormValidation from '../../hooks/useFormValidation';
import AuthFormComponent from '../AuthTentication/AuthFormComponent';
import axios from 'axios';
import { useUserContext } from '../../contexts/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../slicers/api';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  profileImage: '',
};

// Register validate function here
const validate = (values) => {
  const errors = {};
  if (!/^[a-zA-Z]+$/i.test(values.firstName)) {
    errors.firstName = 'Name is required and should only contain letters';
  }
  if (!/^[a-zA-Z]+$/i.test(values.lastName)) {
    errors.lastName = 'Surname is required and should only contain letters';
  }
  if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Valid email is required';
  }
  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(values.password)) {
    errors.password = 'Password must be at least 6 characters and contain a number';
  }
  if (!values.profileImage) {
    errors.profileImage = 'Profile image is required';
  }
  return errors;
};

const AuthForm = () => {
  const [mode, setMode] = useState('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const theme = useTheme();
  const { setIsLoggedIn, isLoggedIn } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const onValidSubmit = async (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);

    if (values.profileImage && values.profileImage instanceof File) {
      formData.append('profileImage', values.profileImage);
    } else {
      console.log('No file attached');
    }

    try {
      const response = await api.post('/users/register', formData);
      setSnackbar({
        open: true,
        message: 'Registration successful. You have been successfully registered.',
        severity: 'success',
      });
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : 'An error occurred during registration.';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
      console.log("Data", formData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      const response = await api.post('/users/login', {
        email: values.email,
        password: values.password,
      });
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      setSnackbar({
        open: true,
        message: 'Login successful. Redirecting to dashboard...',
        severity: 'success',
      });
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : 'An error occurred during login.';
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: 'error',
      });
      console.error("Login error:", error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    handleChange,
    handleFileChange,
    handleSubmit,
    values,
    errors,
  } = useFormValidation(initialValues, validate, onValidSubmit);

  const handleFormSubmission = () => {
    if (mode === 'login') {
      handleLogin(values);
    } else {
      handleSubmit(values);
    }
  };

  const toggleMode = () => {
    setMode(prevMode => {
      const newMode = prevMode === 'signup' ? 'login' : 'signup';
      navigate(`/${newMode}`, { replace: true });  // Change the URL
      return newMode;
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        maxWidth: '400px',
        mx: 'auto',
        p: 4,
        mt: 10,
        mb: 10,
        boxShadow: 3,
        borderRadius: 2,
        position: 'relative',
      }}
    >
      <Typography variant="h4" textAlign="center" mb={3}>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </Typography>
      {isLoading && <LoadingOverlay />}
      <AuthFormComponent
        mode={mode}
        onToggleMode={toggleMode}
        onSubmit={(e) => {
          e.preventDefault();
          handleFormSubmission();
        }}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        values={values}
        errors={errors}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const LoadingOverlay = () => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 1,
    }}
  >
    <CircularProgress thickness={4} size={60} />
  </Box>
);


const MemoizedAuthForm = React.memo(AuthForm)
export default MemoizedAuthForm;