// src/hooks/useFormValidation.js
import { useState, useEffect } from 'react';

const useFormValidation = (initialState, validate, onValidSubmit) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    console.log('Updated form values:', values);
  }, [values]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    console.log(values);
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0 && typeof onValidSubmit === 'function') {
      onValidSubmit(values);
    }
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValues({ ...values, profileImage: event.target.files[0] });
    }
  };




  return {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    handleFileChange
  };
};

export default useFormValidation;
