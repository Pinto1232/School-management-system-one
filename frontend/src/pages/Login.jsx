import React, { useState, useEffect } from 'react';
import { Box, Button, Center, Checkbox, Flex, FormControl, Input, InputGroup, InputRightElement, Image, Link as ChakraLink, Stack, Text, useToast, IconButton, Spacer } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useFormValidation from '../hooks/useFormValidation';
import api from '../services/api';
import logo from '../assets/images/logo.png';
import { useColorModeValue } from '@chakra-ui/react';
import { useUserContext } from '../contexts/UserContext';

const initialValues = {
    email: '',
    password: '',
};

// Add your validation logic here
const validate = (values) => {
    const errors = {};
    // Your validation logic
    return errors;
};

const Login = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [keepMeLogin, setKeepMeLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => setShowPassword(!showPassword);
    const { setIsLoggedIn, isLoggedIn, setUser } = useUserContext();

    
    useEffect(() => {
        if (isLoggedIn) {
          navigate('/dashboard', { replace: true });
        }
      }, [isLoggedIn, navigate]);


    const { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(initialValues, validate);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post('/users/login', {
                email: values.email,
                password: values.password,
            });

            console.log("Login successful, updating state and navigating...");
            setIsLoggedIn(true); // Set context state
            localStorage.setItem('isLoggedIn', 'true'); // Update localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user data
            /* navigate('/dashboard');
             */


            if (keepMeLogin) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            } else {
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('user', JSON.stringify(response.data.user));
            }

            setTimeout(() => {
                navigate('/dashboard');
            }, 500);


        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: 'Login Failed',
                description: 'An error occurred during login. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

    const handleForgotPasswordClick = () => {
        navigate('/forgetPassword');
    };

    const handleKeepMeLoginChange = (e) => {
        setKeepMeLogin(e.target.checked);
    };

    return (
        <Box bg={useColorModeValue('#F7FAFC', 'gray.700')} maxWidth="400px" mx="auto" p={8} mt={10} boxShadow="md" rounded="md">
            <Center mb={4}>
                <Image src={logo} alt="Logo" width="100px" height="100px" />
            </Center>
            <Text fontSize="3xl" textAlign="center" mb={6}>Login</Text>
            <form onSubmit={handleFormSubmit}>
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
                        />
                        {errors.email && <Text color="red.500">{errors.email}</Text>}
                    </FormControl>
                    <FormControl id="password">
                        <InputGroup>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.password}
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
                    <FormControl id="keepMeLogin">
                        <Checkbox
                            name="keepMeLogin"
                            isChecked={keepMeLogin}
                            onChange={handleKeepMeLoginChange}
                        >
                            Keep me logged in
                        </Checkbox>
                    </FormControl>
                    <Button
                        colorScheme="teal"
                        isLoading={isSubmitting}
                        type="submit"
                        width="100%"
                    >
                        Login
                    </Button>
                    <Flex alignItems="center">
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
