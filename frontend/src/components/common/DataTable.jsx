import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Icon,
  ButtonGroup,
  Button,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { useTable, useSortBy } from 'react-table'
import { FaSort, FaSortUp, FaSortDown, FaTrash, FaEye } from 'react-icons/fa'
import axios from 'axios'
import { useUserContext } from '../../contexts/UserContext'
import UserDetailsModal from './UserDetailsModal'

const DataTable = ({ data, fetchData }) => {
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleView = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  console.log('User data table', user)

  const columns = useMemo(
    () => [
      /* {
        Header: 'ID',
        accessor: '_id',
      }, */
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
      }, // Add this comma
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
    // Show a confirmation popup
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this user?'
    )

    // If the user clicked OK, proceed with the deletion
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/users/${id}`)
        // After deleting the user, fetch the data again to update the table
        fetchData()
      } catch (error) {
        console.error('Delete error:', error)
      }
    }
  }

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 6

  // Calculate total pages
  const totalPages = Math.ceil(rows.length / itemsPerPage)

  // Get current table body data
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
                      colorScheme="blue"
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
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <ButtonGroup spacing={2}>
            <Button
              colorScheme="blue"
              onClick={() => handleView(row.original)}
              leftIcon={<FaEye />} // Add the "View" icon
            >
              View
            </Button>
            <Button
              colorScheme="red"
              onClick={() => handleDelete(row.original._id)}
              leftIcon={<FaTrash />} // Add the "Delete" icon
            >
              Delete
            </Button>
          </ButtonGroup>
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
