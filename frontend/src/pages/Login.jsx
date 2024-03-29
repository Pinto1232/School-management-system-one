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
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);


    const { isLoggedIn, login } = useUserContext();


    const handleLogin = (user, token, keepMeLogin) => {
        setUser(user); 
        setToken(token);
        console.log("User:", user);
        console.log("Token:", token);
        console.log("Is it keep log?: ", keepMeLogin)
    };


    const { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(initialValues, validate);



    const handleFormSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const trimmedEmail = values.email.trim();
        const trimmedPassword = values.password.trim();

        if (!trimmedEmail || !trimmedPassword) {
            toast({
                title: 'Validation Error',
                description: 'Email and password are required.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
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
                console.log("Login function called");
                navigate('/dashboard', { replace: true });

            } catch (error) {
                const errorMessage = error.response?.data?.error || 'An error occurred during login. Please try again.';
                console.error('Login error:', errorMessage);
                toast({
                    title: 'Login Failed',
                    description: errorMessage,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
            }
            setLoading(false);
        }, 2000);
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
                                value={values.password || ''} 
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
                        /* isLoading={isSubmitting} */
                        isLoading={loading}
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
