import React, { useState, useContext } from 'react';
import { Box, Button, Center, Link as ChakraLink, Checkbox, Flex, FormControl, FormLabel, Image, Input, Spacer, Stack, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useFormValidation from '../hooks/useFormValidation';
import api from '../services/api';
import UserContext from '../contexts/UserContext';
import logo from '../assets/images/logo.png';
import { useColorModeValue } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const initialValues = {
  email: '',
  password: '',
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
  const [keepMeLogin, setKeepMeLogin] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const textColor = useColorModeValue('#4A5568', '#fff');
  const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');
  const buttonTextColor = useColorModeValue('#fff', '#fff');
  const textFieldBackgroundColor = useColorModeValue('#E2E8F0', '#4A5568');
  const textFieldColor = useColorModeValue('#4A5568', '#fff');
  
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);



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

        if (!toastVisible) {
          toast({
            title: 'Logged in successfully',
            description: 'Welcome to the dashboard',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
            onCloseComplete: () => setToastVisible(false),
          });
          setToastVisible(true);
        }

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
  } = useFormValidation(initialValues, validate, handleFormSubmit);

  const handleForgotPasswordClick = () => {
    navigate('/forgetPassword');
  };

  const handleKeepMeLoginChange = (e) => {
    setKeepMeLogin(e.target.checked);
  };

  return (
    <Box bg={backgroundColor} maxWidth="400px" mx="auto" p={8} marginTop={10} boxShadow="md" rounded="md">
      <Center marginBottom={4}>
        <Image src={logo} alt="Your Logo" width="100px" height="100px" />
      </Center>
      <Text color={textColor} fontSize="3xl" textAlign="center" mb={6}>
        Login
      </Text>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.email}
              errorBorderColor="red.300"
              focusBorderColor={errors.email ? 'red.300' : 'green.300'}
              bg={textFieldBackgroundColor}
              color={textFieldColor}
            />
            {errors.email && <Text color="red.500">{errors.email}</Text>}
          </FormControl>
          <FormControl id="password">
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder='Password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.password}
                errorBorderColor="red.300"
                focusBorderColor={errors.password ? 'red.300' : 'green.300'}
                bg={textFieldBackgroundColor}
                color={textFieldColor}
              />
              <InputRightElement>
                <IconButton
                  aria-label={showPassword ? "Mask password" : "Show password"}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={handlePasswordVisibility}
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
            {errors.password && <Text color="red.500">{errors.password}</Text>}
          </FormControl>
          {errors.serverError && <Text color="red.500">{errors.serverError}</Text>}
          <Button color={buttonTextColor} type="submit" colorScheme="teal" isLoading={isSubmitting} width="100%">
            Login
          </Button>
          <Flex alignItems="center">
            <FormControl id="keepMeLogin">
              <Checkbox
                name="keepMeLogin"
                isChecked={keepMeLogin}
                onChange={handleKeepMeLoginChange}
                onBlur={handleBlur}
              >
                Keep me logged in
              </Checkbox>
            </FormControl>
            <Spacer />
            <ChakraLink color="blue.500" onClick={handleForgotPasswordClick} whiteSpace="nowrap">
              Forgot Password?
            </ChakraLink>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;

