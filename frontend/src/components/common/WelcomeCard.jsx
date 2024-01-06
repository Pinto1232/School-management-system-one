import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, IconButton, useColorModeValue } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

const WelcomeCard = ({ backgroundImage, onAnalyticsClick, onClose }) => {
    const [userData, setUserData] = useState({ firstName: '', lastName: '' });
    console.log("user data", userData)

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/users');
            console.log('Response data on welcome card:', response.data);
            const user = response.data[0];
            setUserData({ firstName: user.firstName, lastName: user.lastName });
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box
            w="60%"
            p={"3%"}
            bgImage={`url('${backgroundImage}')`}
            bg={"red"}
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            transition="background 0.3s ease-in-out"
            position="relative"
        >
            <IconButton
                icon={<CloseIcon />}
                position="absolute"
                top={2}
                right={2}
                bg="whiteAlpha.700"
                onClick={onClose}
                _hover={{ bg: "whiteAlpha.400" }}
            />
            <Flex
                direction="column"
                alignItems="center"
                h="full"
            >
                <Heading as="h4" size="lg" color={useColorModeValue('white', 'white')}>
                    Welcome {userData.firstName} {userData.lastName}
                </Heading>
                <Heading as="h3" size="md">Your Mathematics</Heading>
                <Button
                    mt={4}
                    colorScheme="teal"
                    onClick={() => {
                        onAnalyticsClick();
                        onClose();
                    }}
                >
                    View Analytics
                </Button>
            </Flex>
        </Box>
    );
};

export default WelcomeCard;