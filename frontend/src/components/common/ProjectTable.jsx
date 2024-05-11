import React from 'react'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Progress,
  Avatar,
  Button,
  Flex,
  Input,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiSearch } from 'react-icons/fi'
import ActivityTracker from './ActivityTracker'

const data = [
  {
    id: 1,
    name: 'Ralph Edwards',
    country: 'England',
    email: 'ralph@gmail.com',
    project: 'Task Management Mobile App',
    progress: 100,
    status: 'Completed',
    date: '15/08/2023',
  },
  {
    id: 2,
    name: 'Courtney Henry',
    country: 'Germany',
    email: 'courtney@gmail.com',
    project: 'Marketplace Web App',
    progress: 50,
    status: 'In Progress',
    date: '16/08/2023',
  },
  // Add more entries as needed
]

const DashboardTable = () => {
  const bg = useColorModeValue('gray.800', 'white')
  const color = useColorModeValue('white', 'gray.800')

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green'
      case 'In Progress':
        return 'purple'
      case 'On Hold':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <Box bg={'gray.200'} p={5} borderRadius="lg" boxShadow="md" color={color}>
      <Flex justifyContent="space-between" mb={4} alignItems="center">
        <Flex align="center" bg="white" p={2} borderRadius="md">
          <Icon as={FiSearch} color="gray.500" />
          <Input placeholder="Search" variant="unstyled" ml={2} />
        </Flex>
        <Flex gap={4}>
          <Button rightIcon={<BsThreeDotsVertical />} colorScheme="blue" mr={0}>
            More filters
          </Button>
          <Button rightIcon={<BsThreeDotsVertical />} colorScheme="teal" mr={0}>
            More filters
          </Button>
          <Button rightIcon={<BsThreeDotsVertical />} colorScheme="teal" mr={0}>
            More filters
          </Button>
        </Flex>
      </Flex>
      <Table  colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th>Client Name</Th>
            <Th>Country</Th>
            <Th>Email</Th>
            <Th>Project Name</Th>
            <Th>Task Progress</Th>
            <Th>Status</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Flex align="center">
                  <Avatar name={item.name} mr={2} />
                  <Text color={'black'}>{item.name}</Text>
                </Flex>
              </Td>
              <Td>
                <Flex align="center">
                  <Avatar name={item.name} mr={2} />
                  <Text color={'black'}>{item.name}</Text>
                </Flex>
              </Td>
              <Td color={'black'}>{item.country}</Td>
              <Td color={'black'}>{item.email}</Td>
              <Td color={'black'}>{item.project}</Td>
              <Td>
                <Progress
                  colorScheme={getStatusColor(item.status)}
                  value={item.progress}
                  size="sm"
                />
              </Td>
              <Td color={'black'}>{item.status}</Td>
              <Td color={'black'}>{item.date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex gap={1} alignItems={'center'} justifyContent={'center'}>
        <Box mt={4}>
          <ActivityTracker />
        </Box>
        <Box mt={4}>
          <ActivityTracker />
        </Box>
        <Box mt={4}>
          <ActivityTracker />
        </Box>
        <Box mt={4}>
          <ActivityTracker />
        </Box>
        <Box mt={4}>
          <ActivityTracker />
        </Box>
        <Box mt={4}>
          <ActivityTracker />
        </Box>
        <Box mt={4}>
          <ActivityTracker />
        </Box>
        <Box mt={4}>
          <ActivityTracker />
        </Box>
      </Flex>
      <Flex justifyContent="space-between" mt={4}>
        <Button variant="outline" colorScheme="blue">
          Previous
        </Button>
        <Button variant="outline" colorScheme="blue">
          Next
        </Button>
      </Flex>
    </Box>
  )
}

export default DashboardTable
