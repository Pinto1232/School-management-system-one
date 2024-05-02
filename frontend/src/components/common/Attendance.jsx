import React, { useState, useEffect } from 'react'
import {
  Select,
  Box,
  Text,
  VStack,
  Heading,
  Flex,
  Spinner,
  Button,
} from '@chakra-ui/react'

const Attendance = ({
  onDateRangeChange,
  presentCount,
  absentCount,
  bgBack,
  bordeRad,
  ...props
}) => {
  const [dateRange, setDateRange] = useState('today')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch attendance data when the component mounts or dateRange changes
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Replace with actual data fetching logic
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network request
        if (onDateRangeChange) {
          onDateRangeChange(dateRange)
        }
      } catch (err) {
        setError('Failed to fetch attendance data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [dateRange, onDateRangeChange])

  const handleDateRangeChange = (event) => {
    const selectedRange = event.target.value
    setDateRange(selectedRange)
  }

  return (
    <VStack
      bgGradient={bgBack}
      borderRadius={bordeRad}
      alignItems="start"
      {...props}
      p={4}
      h={'290px'}
    >
      <Flex justifyContent="space-between" w="full">
        <Heading as="h3" size="lg">
          Attendance
        </Heading>
        <Button onClick={() => console.log('Detailed breakdown clicked')}>
          View Details
        </Button>
      </Flex>
      <Box w="100px" mt={'50px'}>
        <Select
          cursor={'pointer'}
          placeholder="Select date range"
          value={dateRange}
          onChange={handleDateRangeChange}
          border="none"
          sx={{ '&:focus': { outline: 'none', boxShadow: 'none' } }}
        >
          <option value="today">Today</option>
          <option value="lastWeek">Last week</option>
          {/* Add more dynamic options here */}
        </Select>
      </Box>
      {isLoading ? (
        <Flex justifyContent="center" w="full">
          <Spinner />
        </Flex>
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <Flex justifyContent={'space-between'} gap={8} w="full">
          <Text fontSize="lg">Present: {presentCount}</Text>
          <Text fontSize="lg">Absent: {absentCount}</Text>
        </Flex>
      )}
    </VStack>
  )
}

export default Attendance
