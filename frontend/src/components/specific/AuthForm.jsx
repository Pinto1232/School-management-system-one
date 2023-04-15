import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useToast, Spinner, Flex, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useFormValidation from '../../hooks/useFormValidation';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

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

    return errors;
};

const AuthForm = ({ mode, onToggleMode }) => {
    const isLogin = mode === 'login';
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const textColor = useColorModeValue('#4A5568', '#fff');
    const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');
    const buttonTextColor = useColorModeValue('#fff', '#fff');
    const textFieldBackgroundColor = useColorModeValue('#E2E8F0', '#4A5568');
    const textFieldColor = useColorModeValue('#4A5568', '#fff');



    const handleFormSubmit = async () => {
        setIsLoading(true); // Set isLoading to true before making the API call

        // Introduce a delay (in milliseconds) before the rest of the code runs
        await new Promise((resolve) => setTimeout(resolve, 3000)); // 3-second delay

        if (isLogin) {
            // Perform login action
            console.log('Login mode');
        } else {
            // Perform sign up action
            console.log('Sign up mode');
            const { firstName, lastName, email, password } = values;

            try {
                const response = await api.post('/users/register', {
                    firstName,
                    lastName,
                    email,
                    password,
                });
                console.log(response);

                if (response.status < 200 || response.status >= 300) {
                    throw new Error('Registration failed');
                }

                const data = response.data;
                console.log('Registration successful', data);

                // Show success toast
                toast({
                    title: 'Success',
                    description: 'You can now login!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                // Redirect to the login page
                navigate('/Login');
            } catch (error) {
                console.error('Error during registration:', error.message);
            }
        }
        setIsLoading(false); // Set isLoading back to false after the API call is completed
    };


    const { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(initialValues, validate, handleFormSubmit);

    const onSubmit = async (e) => {
        e.preventDefault();
        handleSubmit(e);
        if (isSubmitting && Object.keys(errors).length === 0) {
            if (isLogin) {
                // Perform login action
                console.log('Login mode');
            } else {
                // Perform sign up action
                console.log('Sign up mode');
                const { firstName, lastName, email, password } = values;

                try {
                    const response = await api.post('/users/register', {
                        firstName,
                        lastName,
                        email,
                        password,
                    });
                    console.log(response);

                    if (response.status < 200 || response.status >= 300) {
                        throw new Error('Registration failed');
                    }

                    const data = response.data;
                    console.log('Registration successful', data);

                    // Show success toast
                    toast({
                        title: 'Success',
                        description: 'Data was successfully submitted',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });

                    // Redirect to the login page
                    navigate('/login');
                } catch (error) {
                    console.error('Error during registration:', error.message);

                    // Show error toast
                    toast({
                        title: 'Error',
                        description: 'Data was not successfully submitted',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            }
        }
    };

    return (
        <>
            <Box bg={backgroundColor} maxWidth="400px" mx="auto" p={8} marginTop={10} boxShadow="md" rounded="md">
                <Text fontSize="3xl" textAlign="center" mb={6}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </Text>

                {isLoading && (
                    <Flex
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        align="center"
                        justify="center"
                        backgroundColor="rgba(255, 255, 255, 0.8)"
                        zIndex={1}
                    >
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </Flex>
                )}

                <form onSubmit={onSubmit}>
                    <Stack spacing={4}>
                        {!isLogin && (
                            <FormControl>
                                <FormControl id="firstName">
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.firstName}
                                        errorBorderColor="red.300"
                                        focusBorderColor={errors.firstName ? 'red.300' : 'green.300'}
                                        color={textFieldColor}
                                        bg={textFieldBackgroundColor}
                                        placeholder='Name'
                                    />
                                    {errors.firstName && <Text color="red.500">{errors.firstName}</Text>}
                                </FormControl>
                                <br/>
                                <FormControl id="lastName">
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={!!errors.lastName}
                                        errorBorderColor="red.300"
                                        focusBorderColor={errors.lastName ? 'red.300' : 'green.300'}
                                        color={textFieldColor}
                                        bg={textFieldBackgroundColor}
                                        placeholder='Surname'
                                    />
                                    {errors.lastName && <Text color="red.500">{errors.lastName}</Text>}
                                </FormControl>
                            </FormControl>
                        )}
                        <FormControl id="email">
                            <Input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.email}
                                errorBorderColor="red.300"
                                focusBorderColor={errors.email ? 'red.300' : 'green.300'}
                                color={textFieldColor}
                                bg={textFieldBackgroundColor}
                                placeholder='Email'
                            />
                            {errors.email && <Text color="red.500">{errors.email}</Text>}
                        </FormControl>
                        <FormControl id="password">
                            <Input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={!!errors.password}
                                errorBorderColor="red.300"
                                focusBorderColor={errors.password ? 'red.300' : 'green.300'}
                                color={textFieldColor}
                                bg={textFieldBackgroundColor}
                                placeholder='Password'
                            />
                            {errors.password && <Text color="red.500">{errors.password}</Text>}
                        </FormControl>
                        <Button type="submit" colorScheme="blue" w="100%">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </Button>
                    </Stack>
                </form>
                {!isLogin && (
                    <Button colorScheme="teal" mt={4} onClick={() => navigate('/login')} w="100%">
                        Switch to Login
                    </Button>
                )}
            </Box>
        </>
    );
};

export default AuthForm;

