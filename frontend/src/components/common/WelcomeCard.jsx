import React from 'react';
import { Box, Button, Flex, Heading, IconButton, useColorModeValue } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const WelcomeCard = ({ backgroundImage, onAnalyticsClick, onClose }) => {
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
                    Welcome Pinto Manuel
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