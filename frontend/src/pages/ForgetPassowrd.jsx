import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import api from '../services/api';


const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();
    const textFieldBackgroundColor = useColorModeValue('#E2E8F0', '#4A5568');
    const textFieldColor = useColorModeValue('#4A5568', '#fff');
    const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');


    const validateEmail = (email) => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            return 'Valid email is required';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const emailError = validateEmail(email);
        if (emailError) {
            setIsSubmitting(false);
            setErrors({ email: emailError });
            return;
        }

        try {
            // Replace the URL with your actual API endpoint for password reset
            const response = await api.post('/request-password-reset', { email });

            if (response.status === 200) {
                toast({
                    title: 'Reset Password',
                    description: 'A password reset link has been sent to your email address.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right',
                });
            } else {
                throw new Error('An error occurred while sending the reset link.');
            }
        } catch (error) {
            let errorMessage = error.message;
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            }

            toast({
                title: 'Reset Password Failed',
                description: errorMessage,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box bg={backgroundColor} maxWidth="400px" mx="auto" p={8} marginTop={20} boxShadow="md" rounded="md">
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="email" isInvalid={!!errors.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            placeholder='Forgot Password'
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setErrors({ email: validateEmail(email) })}
                            required
                            bg={textFieldBackgroundColor}
                            color={textFieldColor}
                        />
                        {errors.email && <Text color="red.500">{errors.email}</Text>}
                    </FormControl>
                    <Button type="submit" colorScheme="teal" width="100%" isLoading={isSubmitting}>
                        Send Reset Link
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ForgetPassword;
