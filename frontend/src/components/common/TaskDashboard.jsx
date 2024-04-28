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
  Badge,
  Avatar,
  Flex,
  Stack,
  useColorModeValue,
  Checkbox,
} from '@chakra-ui/react'

const TaskDashboard = ({ tasks, onToggleTask }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  return (
    <Box
      bg={bg}
      p={6}
      shadow="lg"
      borderWidth="1px"
      borderRadius="lg"
      maxW="full"
    >
      <Flex justifyContent="space-between" alignItems="center" mb={5}>
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Last tasks
          </Text>
          <Text fontSize="sm" color="gray.600">
            117 total, proceed to resolve them
          </Text>
        </Box>
        <Stack direction="row" spacing={1}>
          <Box
            w={130}
            textAlign="center"
            bg="gray.100"
            p={2}
            borderRadius="md"
            flex="1"
            boxShadow="base"
            m={1}
          >
            <Text fontSize="3xl" fontWeight="bold">
              94
            </Text>
            <Text fontSize="sm" color="gray.600">
              Done
            </Text>
          </Box>
          <Box
            w={130}
            textAlign="center"
            bg="blue.100"
            p={2}
            borderRadius="md"
            flex="1"
            boxShadow="base"
            m={1}
          >
            <Text fontSize="3xl" fontWeight="bold">
              23
            </Text>
            <Text fontSize="sm" color="gray.600">
              In progress
            </Text>
          </Box>
        </Stack>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Admin</Th>
            <Th>Members</Th>
            <Th>Status</Th>
            <Th>Run time</Th>
            <Th>Finish date</Th>
            <Th>Complete</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task, index) => (
            <Tr key={index} _hover={{ bg: hoverBg }}>
              <Td>{task.name}</Td>
              <Td>
                <Avatar name={task.admin} size="sm" />
              </Td>
              <Td>{task.members}</Td>
              <Td>
                <Badge colorScheme={task.status === 'Done' ? 'green' : 'blue'}>
                  {task.status}
                </Badge>
              </Td>
              <Td>{task.runTime}</Td>
              <Td>{task.finishDate}</Td>
              <Td>
                <Checkbox
                  isChecked={task.isCompleted}
                  onChange={() => onToggleTask(task.id)}
                  size="lg"
                  colorScheme="teal"
                ></Checkbox>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default TaskDashboard
