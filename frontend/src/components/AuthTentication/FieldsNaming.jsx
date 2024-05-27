import React from 'react';
import { FormControl, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const NameFields = ({ handleChange, handleBlur, values, errors }) => {
  return (
    <>
      <FormControl fullWidth margin="normal" error={!!errors.firstName}>
        <TextField
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="First Name"
          label="First Name"
          variant="standard"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
      </FormControl>

      <FormControl fullWidth margin="normal" error={!!errors.lastName}>
        <TextField
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Last Name"
          label="Last Name"
          variant="standard"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
      </FormControl>
    </>
  );
};

export const EmailField = ({ handleChange, handleBlur, values, errors }) => {
  return (
    <FormControl fullWidth margin="normal" error={!!errors.email}>
      <TextField
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email Address"
        label="Email Address"
        variant="standard"
        error={!!errors.email}
        helperText={errors.email}
      />
    </FormControl>
  );
};

export const PasswordField = ({ handleChange, handleBlur, values, errors }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <FormControl fullWidth margin="normal" error={!!errors.password}>
      <TextField
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Password"
        label="Password"
        variant="standard"
        value={values.password || ''} 
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handlePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};