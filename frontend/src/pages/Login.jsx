import React, { useState } from 'react';
import { Box, Button, Checkbox, FormControl, FormLabel, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useFormValidation from '../hooks/useFormValidation';
import api from '../services/api';


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

  const handleFormSubmit = async (values, setIsSubmitting) => {
    /* setIsSubmitting(true) */
    try {
      const response = await api.post('/users/login', {
        email: values.email,
        password: values.password,
      });

      const data = response.data;
      console.log('Login successful', data);

      // Add a delay before redirecting
      setTimeout(() => {
        if (values.keepMeLogin) {
          localStorage.setItem('token', data.token);
        } else {
          sessionStorage.setItem('token', data.token);
        }

        // Show a toast message
        toast({
          title: 'Logged in successfully',
          description: 'Welcome to the dashboard',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });

        // Redirect to the dashboard
        navigate('/dashboard');
      }, 3000); // Adjust the delay time as needed (in milliseconds)
    } catch (error) {
      console.error('Error during login:', error.message);
    } 
  };



  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(initialValues, validate, () => handleFormSubmit(values));



  return (
    <Box maxWidth="400px" mx="auto" p={8} marginTop={10} boxShadow="md" rounded="md">
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

