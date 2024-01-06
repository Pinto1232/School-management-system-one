import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Icon, ButtonGroup, Button } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import axios from 'axios';

const DataTable = ({ data, fetchData }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: '_id',
      },
      {
        Header: 'Photo',
        accessor: 'image',
        Cell: ({ value }) => {
          const imageUrl = `http://localhost:3001/api/users/uploads/${value.replace(/\\/g, '/')}`;
          return (
            value ? (
              <img
                src={imageUrl}
                alt="Avatar"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <span>No image</span>
            )
          );
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
  );

  const handleDelete = async (id) => {
    // Show a confirmation popup
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    // If the user clicked OK, proceed with the deletion
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/users/${id}`);
        // After deleting the user, fetch the data again to update the table
        fetchData();
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data }, useSortBy);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(rows.length / itemsPerPage);


  // Get current table body data
  const currentTableBody = rows.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );


  return (
    <Box width="100%" overflowX={{ base: 'scroll', md: 'auto' }}>
      <Table {...getTableProps()} size="lg" variant="striped" colorScheme="blue">
        <Thead bg="whitesmoke" color="blackAlpha.800">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <Box display="flex" alignItems="center">
                    {column.render('Header')}
                    <Box pl={2}>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <Icon as={FaSortDown} />
                          : <Icon as={FaSortUp} />
                        : <Icon as={FaSort} />}
                    </Box>
                  </Box>
                </Th>
              ))}
              <Th>Actions</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} bg="gray.200">
          {currentTableBody.map((row, rowIndex) => {
            prepareRow(row);
            const isOddRow = rowIndex % 2 !== 0;
            const bgColor = isOddRow ? 'gray.300' : 'gray.200';
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()} py={4} verticalAlign="middle" bg={bgColor}>
                    {cell.render('Cell')}
                  </Td>
                ))}
                <Td bg={bgColor}>
                  <Button colorScheme="red" onClick={() => handleDelete(row.original._id)}>Delete</Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {rows.length > itemsPerPage && (
        <Box display="flex" justifyContent="flex-end" mt={4}>
          <ButtonGroup spacing={4}>
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0 || currentPage === totalPages - 1}
              colorScheme="blue"
              variant="outline"
              size="md"
            >
              Previous
            </Button>
            <Box d="flex" alignItems="center" justifyContent="center">
              <Text fontSize="md">{`${currentPage + 1} / ${totalPages}`}</Text>
            </Box>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage >= Math.floor(rows.length / itemsPerPage) || currentPage === totalPages - 1}
              colorScheme="blue"
              variant="solid"
              size="md"
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </Box>
  );
};

export default DataTable;
