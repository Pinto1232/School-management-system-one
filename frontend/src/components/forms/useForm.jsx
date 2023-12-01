import { useState } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setValues({
      ...values,
      profileImage: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      await registerUser();
    }
  };

  const registerUser = async () => {
    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/users/register', formData);
      if (response.status === 201) {
        toast({
          title: 'Registration successful',
          description: 'You have been successfully registered.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/login');
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

  return {
    handleChange,
    handleFileChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
