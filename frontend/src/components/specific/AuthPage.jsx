import React, { useState } from 'react';
import AuthForm from './AuthForm';
import { Box } from '@chakra-ui/react';

const AuthPage = () => {
    const [mode, setMode] = useState('signup');

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'signup' ? 'login' : 'signup'));
    };

    return (
        <Box>
            <AuthForm mode={mode} />
            <Button onClick={toggleMode} mt={4}>
                {mode === 'signup' ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
            </Button>
        </Box>
    );
};

export default AuthPage;
