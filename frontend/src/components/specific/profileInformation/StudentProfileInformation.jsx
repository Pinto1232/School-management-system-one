import React from 'react';
import { Box, Avatar, Text, VStack, HStack, useBreakpointValue, Tag, useColorModeValue } from '@chakra-ui/react';

const StudentProfileInformation = ({ studentData }) => {
    const avatarSize = useBreakpointValue({ base: 'md', md: 'xl' });
    const bgCard = useColorModeValue('gray.50', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    return (
        <Box
            maxW="full"
            mx="auto"
            p={5}
            shadow="xl"
            borderWidth="1px"
            borderRadius="lg"
            bg={bgCard}
            borderColor={borderColor}
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
                        <Text fontSize="sm" color="gray.400">{studentData.email}</Text>
                    </VStack>
                </HStack>
                <Box>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">About Me:</Text>
                    <Text fontSize="sm" color="gray.500">{studentData.bio}</Text>
                </Box>
                <Box>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">Enrollment Date:</Text>
                    <Text fontSize="sm" color="gray.500">{studentData.enrollmentDate}</Text>
                </Box>
                <Box>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">GPA:</Text>
                    <Text fontSize="sm" color="gray.500">{studentData.GPA}</Text>
                </Box>
                <Box>
                    <Text fontSize="md" fontWeight="semibold" color="gray.600">Contact Information:</Text>
                    <HStack spacing={2}>
                        <Text fontSize="sm" color="gray.500">Phone:</Text>
                        <Tag size="sm" borderRadius="full" variant="solid" colorScheme="teal">{studentData.phone}</Tag>
                    </HStack>
                    <HStack spacing={2}>
                        <Text fontSize="sm" color="gray.500">Address:</Text>
                        <Tag size="sm" borderRadius="full" variant="solid" colorScheme="teal">{studentData.address}</Tag>
                    </HStack>
                </Box>
                {/* You can add more sections here as needed */}
            </VStack>
        </Box>
    );
};

export default StudentProfileInformation;