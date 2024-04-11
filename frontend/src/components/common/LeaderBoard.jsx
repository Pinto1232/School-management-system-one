// Importing necessary modules and components
import React from 'react'
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
  useColorModeValue,
} from '@chakra-ui/react'
import { MdMoreHoriz } from 'react-icons/md'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

// LeaderBoardItem component represents each student in the leaderboard
const LeaderBoardItem = ({  percentage, changeDirection, index  }) => {
  const color = useColorModeValue('gray.700', 'gray.200')
  const bgColors = ['red.100', 'blue.100', 'green.100', 'yellow.100', 'purple.100'];
  const bg = useColorModeValue(bgColors[index % bgColors.length], 'gray.900');


  return (
    <Flex
      align="center"
      justifyContent="space-between"
      bg={bg}
      p={1}
      borderRadius="md"
      color={color}
    >
      <Box minWidth="56px">
        <Image
          borderRadius="full"
          boxSize="35px"
          src="https://via.placeholder.com/150"
          alt="Student"
          mr={4}
        />
      </Box>
      <Flex align="center" justify="flex-end">
        <Tooltip label={`Performance: ${percentage}%`} hasArrow>
          <Text fontSize="lg" mr={2}>
            {percentage}%
          </Text>
        </Tooltip>
        <Tooltip
          label={`Trend: ${
            changeDirection === 'up' ? 'Increasing' : 'Decreasing'
          }`}
          hasArrow
        >
          <Icon
            as={changeDirection === 'up' ? FaArrowUp : FaArrowDown}
            color={percentage < 6 ? 'red.500' : 'green.500'}
          />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

// LeaderBoard component represents the entire leaderboard
const LeaderBoard = ({ students }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('gray.700', 'gray.200')

  return (
    <Box
      p={3}
      boxShadow="md"
      borderRadius="md"
      bg={bg}
      color={color}
      h={'299px'}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box>
        <Flex justify="space-between" align="center" mb={1}>
          <Heading as="h3" size="md">
            Leaderboard
          </Heading>
          <IconButton
            aria-label="Options"
            icon={<MdMoreHoriz />}
            variant="ghost"
          />
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
            {students.map((student, index) => (
              <LeaderBoardItem
                key={student.id}
                imageUrl={student.imageUrl}
                percentage={student.percentage}
                changeDirection={student.changeDirection}
                index={index}
              />
            ))}
          </Stack>
        </Box>
      </Box>
      <Divider />
      <Box mx={8}>
        <Button width="full" fontSize={14} colorScheme="teal" >
          VIEW ALL STUDENTS
        </Button>
      </Box>
    </Box>
  )
}

export default LeaderBoard
