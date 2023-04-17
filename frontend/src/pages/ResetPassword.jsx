import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Box } from '@chakra-ui/react';

const ResetPassword = () => {
    const [isValidToken, setIsValidToken] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const { token } = useParams(); // Assuming you have set up React Router to provide the token as a route parameter
     
    useEffect(() => {
        const validateToken = async () => {
            try {
                const response = await api.get(`/reset-password/validate-reset-token/${token}`);
                if (response.status === 200) {
                    setIsValidToken(true);
                    setUserEmail(response.data.userEmail);
                } else {
                    setIsValidToken(false);
                }
            } catch (error) {
                console.error('Error validating token:', error);
                setIsValidToken(false);

                if (error.response && error.response.status === 400) {
                    setUserEmail('Invalid or expired token');
                } else {
                    setUserEmail('An error occurred while processing your request');
                }
            }
        };

        validateToken();
    }, [token]);

    if (isValidToken) {
        return <Box>Token is valid. Show the form to reset the password for {userEmail}.</Box>;
    } else {
        return <Box>{userEmail}</Box>;
    }
};

export default ResetPassword;
