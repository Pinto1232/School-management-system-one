import React, { useState } from 'react';
import { Box, Text, Spinner, Flex, useColorModeValue, useToast } from '@chakra-ui/react';
import useFormValidation from '../../hooks/useFormValidation';
import AuthFormComponent from '../forms/AuthFormComponent'; 
import { useNavigate } from 'react-router-dom';


const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  profileImage: '',
};

// Define your validate function here
const validate = (values) => {
  // Validation logic here
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

// Define what happens when the form is valid
const onValidSubmit = (values, toast, navigate) => {
  // Submission logic here, like calling an API
  console.log('Form is valid, submit to the server:', values);
  // You'll also need to handle toast notifications and navigation
};

const AuthForm = () => {
  const {
    handleChange,
    handleFileChange,
    handleSubmit,
    values,
    errors,
  } = useFormValidation(initialValues, validate, onValidSubmit);
  const [mode, setMode] = useState('signup');
  const navigate = useNavigate();
  const toast = useToast();

  // Handle loading state as needed
  const isLoading = false;
  const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');


  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'signup' ? 'login' : 'signup'));
  };


  // Use the extracted form fields component
  return (
    <Box bg={backgroundColor} maxWidth="400px" mx="auto" p={8} mt={10} boxShadow="md" rounded="md">
      <Text fontSize="3xl" textAlign="center" mb={6}>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </Text>
      {isLoading && <LoadingOverlay />}
      <AuthFormComponent
        mode={mode}
        onToggleMode={toggleMode}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        values={values}
        errors={errors}
      />
    </Box>
  );
};

const LoadingOverlay = () => (
  <Flex position="absolute" top={0} left={0} right={0} bottom={0} align="center" justify="center" bg="rgba(255, 255, 255, 0.8)" zIndex={1}>
    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
  </Flex>
);

export default AuthForm;
