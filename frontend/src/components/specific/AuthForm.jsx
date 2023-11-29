import React, { useState } from 'react';
import { Box, Button, FormControl, Input, Stack, Text, useToast, Spinner, Flex, useColorModeValue, InputRightElement, InputGroup } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useFormValidation from '../../hooks/useFormValidation';
import { ViewOffIcon, ViewIcon } from '@chakra-ui/icons';

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileImage: null,
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

    if (!values.profileImage) {
        errors.profileImage = 'Profile image is required';
    }

    return errors;
};


const registerUser = async (values, toast, navigate) => {
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);


    if (values.profileImage) {
        formData.append('profileImage', values.profileImage);
        console.log("Form data", formData);

        // Debugging: Log formData contents
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
    }


    try {
        const response = await api.post('/users/register', formData);
        if (response.status === 201) {
            toast({
                title: 'Registration successful',
                description: 'You have been successfully registered.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/login');
        } else {
            toast({
                title: 'Registration failed',
                description: 'Something went wrong, please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'An error occurred during registration.';
        toast({
            title: 'Registration Error',
            description: errorMessage,
            status: 'error',
            duration: 5000,
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

    const handleValidSubmit = async (values) => {
        setIsLoading(true);
        await registerUser(values, toast, navigate);
        setIsLoading(false);
    };




    // useFormValidation hook used here
    const { handleChange, handleBlur, handleSubmit, values, errors, handleFileChange } = useFormValidation(
        initialValues,
        validate,
        handleValidSubmit // Pass the handleValidSubmit to useFormValidation
    );



    // Inside AuthForm component
    const onSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission
        console.log("Form submitted");
        handleSubmit(event);
    };



    return (
        <AuthFormComponent
            onSubmit={onSubmit}
            isLoading={isLoading}
            backgroundColor={backgroundColor}
            textFieldBackgroundColor={textFieldBackgroundColor}
            textFieldColor={textFieldColor}
            handleFileChange={handleFileChange} // Pass handleFileChange
            handleChange={handleChange} // Pass handleChange
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            isLogin={isLogin}
            navigate={navigate}
        />
    );
};

const AuthFormComponent = ({ onSubmit, isLoading, backgroundColor, textFieldBackgroundColor, textFieldColor, handleChange, handleFileChange, handleBlur, values, errors, isLogin, navigate }) => (
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

const FormFields = ({
    textFieldBackgroundColor,
    textFieldColor,
    handleChange,
    handleBlur,
    handleFileChange,
    values,
    errors,
    isLogin }) => (
    <Stack spacing={4}>
        {!isLogin && (
            <NameFields
                textFieldBackgroundColor={textFieldBackgroundColor}
                textFieldColor={textFieldColor}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleFileChange={handleFileChange}
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
        {/* Directly adding the image uploader */}
        <FormControl id="profileImage">
            <Input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                style={{ padding: "4px" }}
            />

        </FormControl>
        <Button type="submit" colorScheme="blue" w="100%">
            {isLogin ? 'Login' : 'Sign Up'}
        </Button>
    </Stack>
);

const NameFields = ({ textFieldBackgroundColor, textFieldColor, handleChange, handleBlur, values, errors }) => (
    <>
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
    </>
);

const EmailField = ({ textFieldBackgroundColor, textFieldColor, handleChange, handleBlur, values, errors }) => (
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
);

const PasswordField = ({ textFieldBackgroundColor, textFieldColor, handleChange, handleBlur, values, errors }) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <FormControl id="password">
            <InputGroup size="md">
                <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
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
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>
            {errors.password && <Text color="red.500">{errors.password}</Text>}
        </FormControl>
    );
};

const SwitchButton = ({ navigate }) => (
    <Text fontSize="lg" textAlign="center" mt={6}>
        Already have an account?{' '}
        <Button variant="link" colorScheme="blue" onClick={() => navigate('/login')}>
            Login
        </Button>
    </Text>
);

export default AuthForm;
