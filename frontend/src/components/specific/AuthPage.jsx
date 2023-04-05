import React, { useState } from 'react';
import AuthForm from './AuthForm';

const AuthPage = () => {
    const [mode, setMode] = useState('signup');

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'signup' ? 'login' : 'signup'));
    };

    return (
        <div>
            <AuthForm mode={mode} onToggleMode={toggleMode} />
        </div>
    );
};

export default AuthPage;
