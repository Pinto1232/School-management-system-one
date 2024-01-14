import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    VStack,
    HStack,
    IconButton
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const InteractiveCourseMap = ({ courseModules, onModuleClick }) => {
    const bgColor = useColorModeValue('gray.100', 'gray.700');
    const moduleBgColor = useColorModeValue('white', 'gray.600');
    const textColor = useColorModeValue('gray.800', 'white');

    return (
        <Box p={5} bg={bgColor} borderRadius="lg" boxShadow="md" width="100%">
            <Heading as="h4" size="md" mb={4} color={textColor} textAlign="start">
                Course Map
            </Heading>
            <VStack spacing={4} width="100%">
                {courseModules.map((module, index) => (
                    <Flex key={module.id} align="center" justify="space-between" bg={moduleBgColor} p={4} borderRadius="md" boxShadow="md" width="100%">
                        <Text fontWeight="bold" color={textColor}>{module.name}</Text>
                        <HStack>
                            {module.subModules.map((subModule) => (
                                <IconButton
                                    key={subModule.id}
                                    aria-label={`Navigate to ${subModule.name}`}
                                    icon={<ChevronRightIcon />}
                                    onClick={() => onModuleClick(subModule.id)}
                                />
                            ))}
                        </HStack>
                    </Flex>
                ))}
            </VStack>
        </Box>
    );
};

export default InteractiveCourseMap;