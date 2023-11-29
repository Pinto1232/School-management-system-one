// src/hooks/useFormValidation.js
import { useState, useEffect } from 'react';

const useFormValidation = (initialState, validate, onSubmit, onValidSubmit) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

// Inside useFormValidation hook
/* useEffect(() => {
  console.log('Updated values:', values); 
  if (isSubmitting) {
    const noErrors = Object.keys(errors).length === 0;
    if (noErrors) {
      onSubmit(); 
      setIsSubmitting(false); 
    } else {
      setIsSubmitting(false);
    }
  }
}, [errors, isSubmitting, values, onSubmit]); 
 */
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


  
 // Inside useFormValidation.js
 const handleSubmit = (event) => {
  console.log('Current form values:', values); // Debug current form values
  const validationErrors = validate(values);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length === 0) {
    console.log('Form is valid, submitting:', values); // Debug values when the form is valid
    onValidSubmit(values);
  }
};


  // Inside useFormValidation hook
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file); // Debugging
      setValues(prevValues => ({ 
        ...prevValues, 
        profileImage: file 
      }));
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
