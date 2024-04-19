import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  ButtonGroup,
  Button,
  useToast,
  Text,
  Flex,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useTable, useSortBy } from 'react-table'
import { FaSort, FaSortUp, FaSortDown, FaTrash, FaEye, FaExclamationTriangle } from 'react-icons/fa'
import axios from 'axios'
import { useUserContext } from '../../contexts/UserContext'
import UserDetailsModal from './UserDetailsModal'
import { motion } from 'framer-motion'

const DataTable = ({ data, fetchData }) => {
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const toast = useToast()

  const handleView = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Photo',
        accessor: 'image',
        Cell: ({ value }) => {
          const imageUrl = value
            ? `http://localhost:3001/api/users/uploads/${value
                .split('\\')
                .pop()
                .split('/')
                .pop()}`
            : undefined
          return (
            <Box>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  style={{ borderRadius: '50%' }}
                />
              ) : (
                <span>No image</span>
              )}
            </Box>
          )
        },
      },
      {
        Header: 'Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    []
  )

  const handleDelete = async (id) => {
    const toastId = toast({
      position: 'bottom',
      duration: 3500,
      render: () => (
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            x: {
              type: 'spring',
              stiffness: 900,
              damping: 12,
              repeat: 1,
              repeatType: 'reverse',
              duration: 0.15,
            },
            opacity: { duration: 0.1 },
          }}
        >
          <Box
            width="100vw"
            maxWidth="1300px"
            position="fixed"
            left="50%"
            transform="translateX(-50%)"
            bottom="10px"
            color="white"
            p={3}
            bg="red.500"
            borderRadius="md"
            boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          >
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <Box pr={2}>
                  <FaExclamationTriangle color="yellow" size="24px" />
                </Box>
                <Text>Warning: This Action Cannot Be Undone!</Text>
              </Flex>
              <ButtonGroup size="sm">
                <Button
                  colorScheme="teal"
                  onClick={async () => {
                    toast.close(toastId)
                    try {
                      await axios.delete(
                        `http://localhost:3001/api/users/${id}`
                      )
                      fetchData()
                    } catch (error) {
                      console.error('Delete error:', error)
                    }
                  }}
                >
                  Yes
                </Button>
                <Button colorScheme="red" onClick={() => toast.close(toastId)}>
                  No
                </Button>
              </ButtonGroup>
            </Flex>
          </Box>
        </motion.div>
      ),
    })
  }
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6
  const totalPages = Math.ceil(rows.length / itemsPerPage)

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev))
  }

  const currentTableBody = rows.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <Box width="100%" overflowX={{ base: 'scroll', md: 'auto' }}>
      <Table {...getTableProps()} size="lg" variant="simple" colorScheme="blue">
        <Thead bg="gray.50" color="gray.800">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  <Box display="flex" alignItems="center">
                    {column.render('Header')}
                    <Box pl={2}>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon as={FaSortDown} />
                        ) : (
                          <Icon as={FaSortUp} />
                        )
                      ) : (
                        <Icon as={FaSort} />
                      )}
                    </Box>
                  </Box>
                </Th>
              ))}
              <Th>Actions</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} bg="white">
          {currentTableBody.map((row, rowIndex) => {
            prepareRow(row)
            const isOddRow = rowIndex % 2 !== 0
            const bgColor = isOddRow ? 'gray.50' : 'white'
            return (
              <Tr {...row.getRowProps()} _hover={{ bg: 'gray.100' }}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    py={4}
                    verticalAlign="middle"
                    bg={bgColor}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
                <Td bg={bgColor}>
                  <ButtonGroup spacing={2}>
                    <Button
                      colorScheme="teal"
                      onClick={() => handleView(row.original)}
                      leftIcon={<FaEye />}
                    >
                      View
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(row.original._id)}
                      leftIcon={<FaTrash />}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
      {rows.length > itemsPerPage && (
        <Box display="flex" justifyContent="space-between" mt={4}>
          <ButtonGroup spacing={2}>
            <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </Button>
          </ButtonGroup>
          <Text>
            Page {currentPage + 1} of {totalPages}
          </Text>
        </Box>
      )}
      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        modalWidth="800px"
      />
    </Box>
  )
}

export default DataTable
