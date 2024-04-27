import React from 'react';
import {
  Box, Heading, IconButton, Stack, Divider, Button, Flex, useColorModeValue,
} from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';
import LeaderBoardItem from './LeaderBoardItem'; 

const LeaderBoard = ({ students }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.700', 'gray.200');

  if (!students || students.length === 0) {
    return <Box>No students data available.</Box>;
  }

  return (
    <Box
      p={3}
      boxShadow="md"
      borderRadius="md"
      bg={bg}
      color={color}
      h="369px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Flex justify="space-between" align="center" mb={1}>
          <Heading as="h3" size="md">Leader board</Heading>
          <IconButton aria-label="Options" icon={<MdMoreHoriz />} variant="ghost" />
        </Flex>
        <Box
          maxH="200px"
          overflowY="auto"
          sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
              borderRadius: '8px',
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `rgba(0, 0, 0, 0.2)`,
              borderRadius: '8px',
            },
          }}
        >
          <Stack spacing={4}>
            {students.map(student => (
              <LeaderBoardItem
                key={student.id}
                imageUrl={student.imageUrl}
                name={student.name}
                percentage={student.percentage}
                changeDirection={student.changeDirection}
                index={students.indexOf(student)}
              />
            ))}
          </Stack>
        </Box>
      </Box>
      <Divider />
      <Flex justifyContent="center">
        <Button w={200} fontSize="14" colorScheme="teal">ALL STUDENTS</Button>
      </Flex>
    </Box>
  );
};

export default LeaderBoard;