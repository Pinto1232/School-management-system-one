import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Icon, ButtonGroup, Button } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'; 

const DataTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Photo',
        accessor: 'photo',
        Cell: ({ value }) => (
            <img 
              src={value} 
              alt="Avatar" 
              width={40} 
              height={40}  // Add height to make it a square
              style={{ borderRadius: "50%" }}  // Full rounded corners
            />
          ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Class',
        accessor: 'class',
      },
      {
        Header: 'Parent',
        accessor: 'parent',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'DOB',
        accessor: 'dob',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
    ],
    []
  );

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
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()} bg="gray.200">
        {currentTableBody.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <Td bg={'gray.300'} {...cell.getCellProps()} py={4} verticalAlign="middle">
                    {cell.render('Cell')}
                  </Td>
                );
              })}
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
