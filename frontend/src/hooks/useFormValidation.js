import { useState } from 'react';

const useFormValidation = (initialValues, validate, onValidSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setValues({
      ...values,
      [name]: files[0],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onValidSubmit(values);
    }
  };

  return {
    handleChange,
    handleFileChange,
    handleSubmit,
    values,
    errors,
    setValues, // Ensure setValues is returned
  };
};

export default useFormValidation;