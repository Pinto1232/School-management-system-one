import React from 'react'
import {
  Box,
  Flex,
  Text,
  Icon,
  Tooltip,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from '@chakra-ui/react'
import { FaBookOpen, FaClock, FaAward } from 'react-icons/fa'

const StatisticsCard = ({ totalCourses, hoursSpent, achievements }) => {
  const cardBg = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('gray.700', 'white')

  return (
    <StatGroup
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      boxShadow="sm"
      p={4}
      w="100%"
      gap={4}
    >
      <Stat
        textAlign="center"
        flex="1"
        bg={'red.500'}
        color="white"
        p={4}
        borderRadius="md"
      >
        <StatLabel>Total Courses</StatLabel>
        <Flex alignItems="center" justifyContent="center">
          <Icon as={FaBookOpen} w={10} h={10} mr={2} color="white" />
          <StatNumber fontSize="2xl">{totalCourses}</StatNumber>
        </Flex>
        <StatHelpText>Completed</StatHelpText>
      </Stat>

      <Stat
        textAlign="center"
        flex="1"
        bg={'yellow.400'}
        color="black"
        p={4}
        borderRadius="md"
      >
        <StatLabel>Hours Spent</StatLabel>
        <Flex alignItems="center" justifyContent="center">
          <Icon as={FaClock} w={10} h={10} mr={2} color="black" />
          <StatNumber fontSize="2xl">{hoursSpent}</StatNumber>
        </Flex>
        <StatHelpText>Learning</StatHelpText>
      </Stat>

      <Stat
        textAlign="center"
        flex="1"
        bg={'blue.500'}
        color="white"
        p={4}
        borderRadius="md"
      >
        <StatLabel>Achievements</StatLabel>
        <Flex alignItems="center" justifyContent="center">
          <Icon as={FaAward} w={10} h={10} mr={2} color="white" />
          <StatNumber fontSize="2xl">{achievements}</StatNumber>
        </Flex>
        <StatHelpText>Unlocked</StatHelpText>
      </Stat>
    </StatGroup>
  )
}

export default StatisticsCard
