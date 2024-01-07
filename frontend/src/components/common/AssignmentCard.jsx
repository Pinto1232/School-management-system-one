import React, { useEffect, useState } from 'react';
import { Box, Text, Progress, VStack, Flex, Heading, Menu, MenuButton, IconButton, MenuList, MenuItem } from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';

const getColorScheme = (percentage) => {
    if (percentage <= 25) {
        return 'red';
    } else if (percentage <= 50) {
        return 'red';
    } else if (percentage <= 75) {
        return 'purple';
    } else {
        return 'green';
    }
};

const AssignmentCard = ({ assignments }) => {

    const [progressValues, setProgressValues] = useState({});

    useEffect(() => {
        const initialProgressValues = assignments.reduce((acc, assignment) => {
          acc[assignment.subject] = 0;
          return acc;
        }, {});
        setProgressValues(initialProgressValues);
        const intervalIds = assignments.map((assignment) => {
          const intervalId = setInterval(() => {
            setProgressValues((prevValues) => {
              const nextValue = Math.min(prevValues[assignment.subject] + 1, assignment.percentage);
              return { ...prevValues, [assignment.subject]: nextValue };
            });
          }, 20); 
          return intervalId;
        });
        return () => {
          intervalIds.forEach(clearInterval);
        };
      }, [assignments]);
    

    return (
        <Box
            p={4}
            borderRadius="md"
            boxShadow="md"
            style={{
                background: 'linear-gradient(to right, #90EEEE90, #D8BFD7)' // Using inline styles for gradient
            }}
            w="full"
            h={'180px'}
            position="relative"
        >
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<MdMoreHoriz />}
                    position="absolute"
                    top={2}
                    right={2}
                    size="lg"
                    variant="ghost"
                />
                <MenuList>
                    <MenuItem>Option 1</MenuItem>
                    <MenuItem>Option 2</MenuItem>
                    <MenuItem>Option 3</MenuItem>
                </MenuList>
            </Menu>
            <Heading as="h3" size="lg">Assignment</Heading>
            <VStack spacing={4} align="stretch" mt={2}>
                {assignments.map((assignment) => (
                    <Flex key={assignment.subject} width="100%" justifyContent={'space-between'} alignItems="center">
                        <Box flexShrink={0} width="30%">
                            <Text fontSize="lg" fontWeight="bold">
                                {assignment.subject}
                            </Text>
                        </Box>
                        <Box width="100%" mx={4}>
                        <Progress value={progressValues[assignment.subject] || 0} colorScheme={getColorScheme(assignment.percentage)} size="sm" />
                        </Box>
                        <Box shadow={'md'} bg={"white"} borderRadius={'md'} flexShrink={0} width="8%" textAlign="right">
                            <Text fontSize="sm" fontWeight={'bold'} color="gray.600">{progressValues[assignment.subject] || 0}%</Text>
                        </Box>
                    </Flex>
                ))}
            </VStack>
        </Box>
    );
};

export default AssignmentCard;