// src/hooks/useFormValidation.js
import { useState, useEffect } from 'react';

const useFormValidation = (initialState, validate, onSubmit) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

// Inside useFormValidation hook
useEffect(() => {
  if (isSubmitting) {
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors) {
      onSubmit(); // This should be the registerUser function
      setIsSubmitting(false); // Set it to false after calling the submit function
    } else {
      setIsSubmitting(false);
    }
  }
  // Removed the setErrors function from dependencies because it does not change
}, [errors, isSubmitting, values, onSubmit]); // Added values to dependencies to ensure the latest values are used


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  // Inside useFormValidation hook
const handleFileChange = (event) => {
  const { files } = event.target;
  if (files.length > 0) {
    const file = files[0];
    setValues((prevValues) => ({ ...prevValues, profileImage: file }));
  }
};

  

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    handleFileChange
  };
};

export default useFormValidation;
