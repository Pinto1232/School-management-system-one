import React from 'react';
import { Box, Avatar, Text, VStack, HStack, useBreakpointValue, Tag, useColorModeValue, ScaleFade, Icon } from '@chakra-ui/react';
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';

const StudentProfileInformation = ({ studentData, isLoading, isError }) => {
    const avatarSize = useBreakpointValue({ base: 'md', md: 'xl' });
    const bgGradient = useColorModeValue('linear(to-r, pink.50, orange.100)', 'linear(to-r, pink.700, orange.600)');

    if (isLoading) {
        return (
            <Box textAlign="center" p={5}>
                <Text>Loading student information...</Text>
            </Box>
        );
    }

    if (isError) {
        return (
            <Box textAlign="center" p={5}>
                <Text>Failed to load student information. Please try again later.</Text>
            </Box>
        );
    }

    return (
        <ScaleFade in={!isLoading}>
            <Box
                maxW="full"
                mx="auto"
                p={5}
                shadow="xl"
                borderWidth="1px"
                borderRadius="lg"
                bgGradient={bgGradient}
                transition="all 0.3s ease-in-out"
                _hover={{ transform: 'scale(1.05)', shadow: '2xl' }}
            >
                <VStack spacing={4} align="stretch">
                    <HStack spacing={5} align="center">
                        <Avatar
                            size={avatarSize}
                            name={studentData.name}
                            src={studentData.avatarUrl}
                            border="2px solid"
                            borderColor="teal.500"
                        />
                        <VStack align="start" spacing={1}>
                            <Text fontSize="2xl" fontWeight="bold" color="teal.600">{studentData.name}</Text>
                            <Text fontSize="md" color="gray.500">{studentData.major}</Text>
                            <HStack spacing={2}>
                                <Icon as={EmailIcon} color="teal.500" />
                                <Text fontSize="sm" color="gray.400">{studentData.email}</Text>
                            </HStack>
                        </VStack>
                    </HStack>
                    {/* Additional student information goes here */}
                </VStack>
            </Box>
        </ScaleFade>
    );
};

export default StudentProfileInformation;