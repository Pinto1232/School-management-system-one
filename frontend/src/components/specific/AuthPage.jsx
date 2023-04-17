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
            <AuthForm mode={mode} onToggleMode={toggleMode} />
        </Box>
    );
};

export default AuthPage;
