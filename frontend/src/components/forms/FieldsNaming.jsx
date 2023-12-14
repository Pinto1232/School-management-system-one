// FieldsNaming.jsx
import React from 'react';
import { FormControl, Input, Text, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export const NameFields = ({ handleChange, handleBlur, values, errors }) => {
  return (
    <>
      <FormControl id="firstName" isInvalid={!!errors.firstName}>
        <Input
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="First Name"
        />
        {errors.firstName && <Text color="red.500">{errors.firstName}</Text>}
      </FormControl>

      <FormControl id="lastName" isInvalid={!!errors.lastName}>
        <Input
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Last Name"
        />
        {errors.lastName && <Text color="red.500">{errors.lastName}</Text>}
      </FormControl>
    </>
  );
};

export const EmailField = ({ handleChange, handleBlur, values, errors }) => {
  return (
    <FormControl id="email" isInvalid={!!errors.email}>
      <Input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email Address"
      />
      {errors.email && <Text color="red.500">{errors.email}</Text>}
    </FormControl>
  );
};

export const PasswordField = ({ handleChange, handleBlur, values, errors }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl id="password" isInvalid={!!errors.password}>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={values.password || ''} // Make sure the value is taken from the state
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={!!errors.password}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handlePasswordVisibility}>
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      {errors.password && <Text color="red.500">{errors.password}</Text>}
    </FormControl>
  );
};

// You can continue adding more specific field components here as needed
