import React from 'react'
import {
  Box,
  Image,
  Flex,
  Icon,
  Tooltip,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'

const bgColors = [
  'red.100',
  'blue.100',
  'green.100',
  'yellow.100',
  'purple.100',
]

const LeaderBoardItem = ({
  imageUrl,
  name,
  percentage,
  changeDirection,
  index,
}) => {
  const color = useColorModeValue('gray.700', 'gray.200')
  const bg = useColorModeValue(bgColors[index % bgColors.length], 'gray.900')
  const performanceLabel = `Performance: ${percentage}%`
  const trendLabel = `Trend: ${
    changeDirection === 'up' ? 'Increasing' : 'Decreasing'
  }`

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      bg={bg}
      p={1}
      borderRadius="md"
      boxShadow="2lg"
      color={color}
    >
      <Box minWidth="56px" ml={1}>
        <Image
          borderRadius="full"
          boxSize="35px"
          src={imageUrl}
          alt="Student"
          mr={4}
        />
      </Box>
      <span>{name}</span>
      <Flex
        align="center"
        justify="flex-end"
        bg="black"
        color="white"
        p={1}
        mr={1}
        borderRadius="md"
      >
        <Tooltip label={`Performance: ${percentage}%`} hasArrow>
          <Text fontSize="sm" mr={2}>
            {percentage}%
          </Text>
        </Tooltip>
        <Tooltip label={performanceLabel} hasArrow>
          <Text fontSize="sm" mr={2}>
            {percentage}%
          </Text>
        </Tooltip>
        <Tooltip label={trendLabel} hasArrow>
          <Icon
            as={changeDirection === 'up' ? FaArrowUp : FaArrowDown}
            color={percentage < 6 ? 'red.500' : 'green.500'}
          />
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default LeaderBoardItem
