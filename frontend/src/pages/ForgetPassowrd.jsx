import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Text,
    useToast,
} from '@chakra-ui/react';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic for handling the password reset request here
        toast({
            title: 'Reset Password',
            description: 'A password reset link has been sent to your email address.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        });
    };

    return (
        <Box maxWidth="400px" mx="auto" p={8} marginTop={20} boxShadow="md" rounded="md">
            <Text fontSize="3xl" textAlign="center" mb={6}>
                Forgot Password
            </Text>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    <FormControl id="email">
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </FormControl>
                    <Button type="submit" colorScheme="teal" width="100%">
                        Send Reset Link
                    </Button>
                </Stack>
            </form>
        </Box>
    );
};

export default ForgetPassword;
