import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Stack,
  Link,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import api from '../../services/api';
import logo from '../../assets/images/logo.png';
import { useUserContext } from '../../contexts/UserContext';

const initialValues = {
  email: '',
  password: '',
};


const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};

const Login = () => {
  const navigate = useNavigate();
  const [keepMeLogin, setKeepMeLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const { login } = useUserContext();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = (user, token, keepMeLogin) => {
    console.log('User:', user);
    console.log('Token:', token);
    console.log('Is it keep log?: ', keepMeLogin);
  };

  const { handleChange, handleBlur, handleSubmit, values, errors } =
    useFormValidation(initialValues, validate, async (values) => {
      setLoading(true);

      const trimmedEmail = values.email.trim();
      const trimmedPassword = values.password.trim();

      if (!trimmedEmail || !trimmedPassword) {
        setSnackbar({
          open: true,
          message: 'Email and password are required.',
          severity: 'error',
        });
        setLoading(false);
        return;
      }

      setTimeout(async () => {
        try {
          const response = await api.post('/users/login', {
            email: trimmedEmail,
            password: trimmedPassword,
          });

          handleLogin(response.data.user, response.data.token, keepMeLogin);
          login(response.data.user, response.data.token, keepMeLogin);
          setSnackbar({
            open: true,
            message: 'Login successful. Redirecting to dashboard...',
            severity: 'success',
          });
          navigate('/dashboard', { replace: true });
        } catch (error) {
          const errorMessage =
            error.response?.data?.error ||
            'An error occurred during login. Please try again.';
          console.error('Login error:', errorMessage);
          setSnackbar({
            open: true,
            message: errorMessage,
            severity: 'error',
          });
        } finally {
          setLoading(false);
        }
      }, 2000);
    });

  const handleForgotPasswordClick = () => {
    navigate('/forgetPassword');
  };

  const handleKeepMeLoginChange = (e) => {
    setKeepMeLogin(e.target.checked);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        maxWidth: '400px',
        mx: 'auto',
        p: 4,
        mt: 10,
        mb: 10,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Box display="flex" justifyContent="center" mb={4}>
        <img src={logo} alt="Logo" width="100px" height="100px" />
      </Box>
      <Typography variant="h4" textAlign="center" mb={3}>
        Login
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Stack spacing={4}>
          <FormControl fullWidth margin="normal" error={!!errors.email}>
            <TextField
              type="email"
              name="email"
              placeholder="Email"
              label="Email"
              variant="standard"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
            />
          </FormControl>
          <FormControl fullWidth margin="normal" error={!!errors.password}>
            <TextField
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              label="Password"
              variant="standard"
              value={values.password || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl>
            <Box display="flex" alignItems="center">
              <Checkbox
                name="keepMeLogin"
                checked={keepMeLogin}
                onChange={handleKeepMeLoginChange}
              />
              <Typography variant="body2" component="span">
                Keep me logged in
              </Typography>
            </Box>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Link
              component="button"
              variant="body2"
              onClick={handleForgotPasswordClick}
            >
              Forgot Password?
            </Link>
          </Box>
        </Stack>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

const MemoizedLogin = React.memo(Login)
export default MemoizedLogin;