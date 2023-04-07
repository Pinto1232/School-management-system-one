import React, { useState, useContext } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useFormValidation from '../hooks/useFormValidation';
import api from '../services/api';
import UserContext from '../contexts/UserContext';

const initialValues = {
  email: '',
  password: '',
  keepMeLogin: false,
};

const validate = (values) => {
  const errors = {};

  if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Valid email is required';
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(values.password)) {
    errors.password = 'Password must be at least 6 characters and contain a number';
  }

  return errors;
};

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser, setIsLoggedIn } = useContext(UserContext);

  const handleFormSubmit = async (values, setIsSubmitting, setErrors) => {
    try {
      const response = await api.post('/users/login', {
        email: values.email,
        password: values.password,
      });

      const data = response.data;
      console.log('Login successful', data);

      setTimeout(() => {
        if (values.keepMeLogin) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        } else {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user));
        }

        toast({
          title: 'Logged in successfully',
          description: 'Welcome to the dashboard',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });

        navigate('/dashboard');
      }, 3000);

      setUser(data.user);
      console.log('User data:', data.user);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error during login:', error);

      if (error.response && error.response.status === 400) {
        const serverError = error.response.data.error;

        if (serverError === 'Invalid email or password') {
          setErrors((prevErrors) => ({ ...prevErrors, serverError }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, serverError }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          serverError: 'An unexpected error occurred. Please try again.',
        }));
      }

      setIsSubmitting(false);
    }
  };


  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    setErrors,
  } = useFormValidation(initialValues, validate, handleFormSubmit);

  return (
    <Box maxWidth="400px" mx="auto" p={8} marginTop={20} boxShadow="md" rounded="md">
      <Text fontSize="3xl" textAlign="center" mb={6}>
        Login
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email}
              errorBorderColor="red.300"
              focusBorderColor={errors.email ? 'red.300' : 'green.300'}
            />
            {errors.email && <Text color="red.500">{errors.email}</Text>}
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.password}
              errorBorderColor="red.300"
              focusBorderColor={errors.password ? 'red.300' : 'green.300'}
            />
            {errors.password && <Text color="red.500">{errors.password}</Text>}
          </FormControl>
          {errors.serverError && <Text color="red.500">{errors.serverError}</Text>}
          <Button type="submit" colorScheme="teal" isLoading={isSubmitting} width="100%">
            Login
          </Button>
          <FormControl id="keepMeLogin">
            <Checkbox
              name="keepMeLogin"
              isChecked={values.keepMeLogin}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              Keep me logged in
            </Checkbox>
          </FormControl>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;

