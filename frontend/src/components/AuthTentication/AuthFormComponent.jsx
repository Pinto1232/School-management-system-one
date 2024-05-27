import React from 'react';
import { Box, Stack, FormControl, Input, Button, Typography } from '@mui/material';
import { NameFields, EmailField, PasswordField } from './FieldsNaming';
import { Attachment } from '@mui/icons-material';

const AuthFormComponent = ({
  onSubmit,
  handleChange,
  handleFileChange,
  values,
  errors,
  mode,
  onToggleMode
}) => (
  <form onSubmit={onSubmit}>
    <Stack spacing={4}>
      {mode === 'signup' ? (
        // Sign-up specific fields
        <>
          <NameFields handleChange={handleChange} values={values} errors={errors} />
          <EmailField handleChange={handleChange} values={values} errors={errors} />
          <PasswordField handleChange={handleChange} values={values} errors={errors} />
          <FormControl>
            <Input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleFileChange}
              sx={{ display: 'none' }}
            />
            <Button
              component="label"
              htmlFor="profileImage"
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ textAlign: 'center', cursor: 'pointer' }}
              startIcon={<Attachment />}
            >
              Choose File
            </Button>
          </FormControl>
        </>
      ) : (
        // Login specific fields
        <>
          <EmailField handleChange={handleChange} values={values} errors={errors} />
          <PasswordField handleChange={handleChange} values={values} errors={errors} />
          {/* Add other login fields if needed */}
        </>
      )}

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </Button>

      <Typography textAlign="center" mt={4}>
        {mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <Button variant="text" color="primary" onClick={onToggleMode}>
              Login
            </Button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <Button variant="text" color="primary" onClick={onToggleMode}>
              Sign Up
            </Button>
          </>
        )}
      </Typography>
    </Stack>
  </form>
);

export default AuthFormComponent;