import React from 'react';
import { Stack, FormControl, Input, Button, Text } from '@chakra-ui/react';
import { NameFields, EmailField, PasswordField } from '../forms/FieldsNaming';
import { AttachmentIcon } from '@chakra-ui/icons';

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
      {mode === 'signup' && (
        <NameFields handleChange={handleChange} values={values} errors={errors} />
      )}

      {/* Email and Password Fields are common for both Sign Up and Login */}
      <EmailField handleChange={handleChange} values={values} errors={errors} />
      <PasswordField handleChange={handleChange} values={values} errors={errors} />

      {mode === 'signup' && (
        <FormControl>
          <Input type="file" id="profileImage" name="profileImage" accept="image/*" onChange={handleFileChange} hidden />
          <Button
            as="label"
            htmlFor="profileImage"
            variant="outline"
            colorScheme="blue"
            w="100%"
            textAlign="center"
            cursor="pointer"
            leftIcon={<AttachmentIcon />}
          >
            Choose File
          </Button>
        </FormControl>
      )}

      <Button type="submit" colorScheme="blue" w="100%">{mode === 'login' ? 'Login' : 'Sign Up'}</Button>

      <Text textAlign="center" mt={4}>
        {mode === 'signup' ? (
          <>
            Already have an account?{' '}
            <Button variant="link" colorScheme="blue" onClick={onToggleMode}>
              Login
            </Button>
          </>
        ) : (
          <>
            Don't have an account?{' '}
            <Button variant="link" colorScheme="blue" onClick={onToggleMode}>
              Sign Up
            </Button>
          </>
        )}
      </Text>
    </Stack>
  </form>
);

export default AuthFormComponent;
