import React, { useState } from 'react';
import { Box, Text, Spinner, Flex, useColorModeValue, useToast } from '@chakra-ui/react';
import useFormValidation from '../../hooks/useFormValidation';
import AuthFormComponent from '../forms/AuthFormComponent';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  profileImage: '',
};

// validate function here
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


const AuthForm = () => {
  const [mode, setMode] = useState('signup');
  const navigate = useNavigate();
  const toast = useToast();
  const isLoading = false;
  const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');


  const onValidSubmit = (values) => {
    // Implement your form submission logic here
    const formData = new FormData();
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);

    // Check if profileImage is a File object before appending
    if (values.profileImage && values.profileImage instanceof File) {
      formData.append('profileImage', values.profileImage);
    } else {
      console.log('No file attached');
    }
    

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("Form data", [...formData])
    // API call and further logic
    axios.post('http://localhost:3001/api/users/register', formData)
      .then(response => {
        toast({
          title: 'Registration successful',
          description: 'You have been successfully registered.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/login');
      })
      .catch(error => {
        toast({
          title: 'Registration Error',
          description: error.response.data.message || 'An error occurred during registration.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        console.log("Data", formData)
      });
  };

  // useFormValidation hook
  const {
    handleChange,
    handleFileChange,
    handleSubmit,
    values,
    errors,
  } = useFormValidation(initialValues, validate, onValidSubmit);


  // handleFormSubmission
  const handleFormSubmission = () => {
    handleSubmit(values, toast, navigate);
  };



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
          handleFormSubmission();
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
