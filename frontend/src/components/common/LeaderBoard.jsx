import React from 'react';
import {
  Box,
  Heading,
  IconButton,
  Image,
  Stack,
  Divider,
  Button,
  Text,
  Flex,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const LeaderBoardItem = ({ imageUrl, percentage, changeDirection }) => (
  <Flex align="center" justifyContent="space-between" >
    <Box minWidth="56px">
      <Image borderRadius="full" boxSize="50px" src={imageUrl} alt="Student" mr={4} />
    </Box>
    <Box flex="1">
      <Tooltip label={`Performance: ${percentage}%`} hasArrow>
        <Text fontSize="lg">{percentage}%</Text>
      </Tooltip>
      <Tooltip label={`Trend: ${changeDirection === 'up' ? 'Increasing' : 'Decreasing'}`} hasArrow>
        <Icon
          as={changeDirection === 'up' ? FaArrowUp : FaArrowDown}
          color={percentage < 6 ? "red.500" : "green.500"}
        />
      </Tooltip>
    </Box>
  </Flex>
);

const LeaderBoard = ({ students }) => (
  <Box p={3} boxShadow="md" borderRadius="md" bgGradient="linear(to-r, green.400, blue.500)" h={"289px"} display="flex" flexDirection="column" justifyContent="space-between">
    <Box>
      <Flex justify="space-between" align="center" mb={1}>
        <Heading as="h3" size="lg">Leaderboard</Heading>
        <IconButton
          aria-label="Options"
          icon={<MdMoreHoriz />}
          variant="ghost"
        />
      </Flex>
      <Box maxH="200px" overflowY="auto" sx={{
        '&::-webkit-scrollbar': {
          width: '8px',
          borderRadius: '8px',
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: `rgba(0, 0, 0, 0.2)`,
          borderRadius: '8px',
        }
      }}> {/* Container for scrolling */}
        <Stack spacing={4}>
          {students.map((student) => (
            <LeaderBoardItem
              key={student.id}
              imageUrl={student.imageUrl}
              percentage={student.percentage}
              changeDirection={student.changeDirection}
            />
          ))}
        </Stack>
      </Box>
    </Box>
    <Divider />
    <Box>
      <Button width="full" fontSize={14} colorScheme="transparent" color={"white"}>
        VIEW ALL STUDENTS
      </Button>
    </Box>
  </Box>
);

export default LeaderBoard;