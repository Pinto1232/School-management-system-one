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

const registerUser = async (values, toast, navigate) => {
    const { firstName, lastName, email, password } = values;

    try {
        const response = await api.post('/users/register', {
            firstName,
            lastName,
            email,
            password,
        });

        if (response.status < 200 || response.status >= 300) {
            throw new Error('Registration failed');
        }

        // Show success toast
        toast({
            title: 'Success',
            description: 'You can now login!',
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
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
};

const AuthForm = ({ mode, onToggleMode }) => {
    const isLogin = mode === 'login';
    const navigate = useNavigate();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');
    const textFieldBackgroundColor = useColorModeValue('#E2E8F0', '#4A5568');
    const textFieldColor = useColorModeValue('#4A5568', '#fff');

    const handleFormSubmit = async () => {
        setIsLoading(true);

        if (!isLogin) {
            await registerUser(values, toast, navigate);
        }

        setIsLoading(false);
    };

    const { handleChange, handleBlur, handleSubmit, values, errors, isSubmitting } = useFormValidation(initialValues, validate, handleFormSubmit);

    const onSubmit = async (e) => {
        e.preventDefault();
        handleSubmit(e);
        if (isSubmitting && Object.keys(errors).length === 0 && !isLogin) {
            await registerUser(values, toast, navigate);
        }
    };

    return (
        <AuthFormComponent
            onSubmit={onSubmit}
            isLoading={isLoading}
            backgroundColor={backgroundColor}
            textFieldBackgroundColor={textFieldBackgroundColor}
            textFieldColor={textFieldColor}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            isLogin={isLogin}
            navigate={navigate}
        />
    );
};

const AuthFormComponent = ({ onSubmit, isLoading, backgroundColor, textFieldBackgroundColor, textFieldColor, handleChange, handleBlur, values, errors, isLogin, navigate }) => (
    <>
        <Box bg={backgroundColor} maxWidth="400px" mx="auto" p={8} marginTop={10} boxShadow="md" rounded="md">
            <Text fontSize="3xl" textAlign="center" mb={6}>
                {isLogin ? 'Login' : 'Sign Up'}
            </Text>
            {isLoading && <LoadingOverlay />}
            <form onSubmit={onSubmit}>
                <FormFields
                    textFieldBackgroundColor={textFieldBackgroundColor}
                    textFieldColor={textFieldColor}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={values}
                    errors={errors}
                    isLogin={isLogin}
                />
            </form>
            {!isLogin && <SwitchButton navigate={navigate} />}
        </Box>
    </>
);

const LoadingOverlay = () => (
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
);

const FormFields = ({ textFieldBackgroundColor, textFieldColor, handleChange, handleBlur, values, errors, isLogin }) => (
    <Stack spacing={4}>
        {!isLogin && (
            <NameFields
                textFieldBackgroundColor={textFieldBackgroundColor}
                textFieldColor={textFieldColor}
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
            />
        )}
        <EmailField
            textFieldBackgroundColor={textFieldBackgroundColor}
            textFieldColor={textFieldColor}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
        />
        <PasswordField
            textFieldBackgroundColor={textFieldBackgroundColor}
            textFieldColor={textFieldColor}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
        />
        <Button type="submit" colorScheme="blue" w="100%">
            {isLogin ? 'Login' : 'Sign Up'}
        </Button>
    </Stack>
);

const NameFields = ({ textFieldBackgroundColor, textFieldColor, handleChange, handleBlur, values, errors }) => (
    <>
        <FormControl id="firstName">
            <FormInput
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
        <FormControl id="lastName">
            <FormInput
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
    </>
);

const EmailField = ({ textFieldBackgroundColor, textFieldColor, handleChange, handleBlur, values, errors }) => (
    <FormControl id="email">
        <FormInput
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
);

const PasswordField = ({ textFieldBackgroundColor, textFieldColor, handleChange, handleBlur, values, errors }) => (
    <FormControl id="password">
        <FormInput
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
);

const FormInput = ({ type, name, value, onChange, onBlur, isInvalid, errorBorderColor, focusBorderColor, color, bg, placeholder }) => (
    <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={isInvalid}
        errorBorderColor={errorBorderColor}
        focusBorderColor={focusBorderColor}
        color={color}
        bg={bg}
        placeholder={placeholder}
    />
);

const SwitchButton = ({ navigate }) => (
    <Button colorScheme="teal" mt={4} onClick={() => navigate('/login')} w="100%">
        Switch to Login
    </Button>
);

export default AuthForm;
