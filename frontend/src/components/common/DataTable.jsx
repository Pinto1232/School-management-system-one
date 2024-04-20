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
  Spinner,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useTable, useSortBy } from 'react-table'
import { FaSort, FaSortUp, FaSortDown, FaTrash, FaEye } from 'react-icons/fa'
import axios from 'axios'
import { useUserContext } from '../../contexts/UserContext'
import useConfirmationToast from '../../hooks/useConfirmationToast/useConfirmationToast'
import UserDetailsModal from './UserDetailsModal'
import useLoading from '../../hooks/useLoading/useLoading'

const DataTable = ({ data, fetchData }) => {
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { isLoading, startLoading, stopLoading } = useLoading()
  const showToast = useConfirmationToast()
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
                  width={60}
                  height={60}
                  style={{
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    objectFit: 'cover',
                  }}
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

  
  const handleDelete = (id) => {
    showToast(
      id,
      async (toastId, userId) => {
        try {
          const response = await axios.delete(
            `http://localhost:3001/api/users/${userId}`
          )
          if (response.status === 200) {
            fetchData()
            toast({
              title: 'User Deleted',
              description: 'The user has been successfully deleted.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            })
          } else {
            throw new Error('Failed to delete the user')
          }
        } catch (error) {
          console.error('Delete error:', error)
          toast({
            title: 'Error',
            description: 'Failed to delete the user.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        } finally {
          toast.close(toastId)
        }
      },
      (toastId) => {
        toast.close(toastId)
      }
    )
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

  const loadData = async () => {
    startLoading()
    try {
      await fetchData()
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      stopLoading()
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Box width="100%" overflowX={{ base: 'scroll', md: 'auto' }}>
         {isLoading ? (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="xl" />
        </Flex>
      ) : (
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
                      shadow="md"
                      _hover={{ shadow: 'lg' }}
                    >
                      View
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => handleDelete(row.original._id)}
                      leftIcon={<FaTrash />}
                      shadow="md"
                      _hover={{ shadow: 'lg' }}
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
        )}
      {rows.length > itemsPerPage && (
        <Box display="flex" justifyContent="space-between" mt={4}>
          <ButtonGroup spacing={2}>
            {currentPage > 0 && (
              <Button
                onClick={handlePreviousPage}
                colorScheme="teal"
                _hover={{ bg: 'teal.600' }}
                p={2}
                h={7}
                w={100}
                borderRadius={2}
                fontSize={12}
              >
                Previous
              </Button>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => setCurrentPage(index)}
                colorScheme={currentPage === index ? 'teal' : 'gray'}
                p={2}
                h={7}
                borderRadius={2}
                fontSize={12}
              >
                {index + 1}
              </Button>
            ))}
            {currentPage < totalPages - 1 && (
              <Button
                onClick={handleNextPage}
                colorScheme="teal"
                _hover={{ bg: 'teal.600' }}
                p={2}
                h={7}
                w={100}
                borderRadius={2}
                fontSize={12}
              >
                Next
              </Button>
            )}
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
