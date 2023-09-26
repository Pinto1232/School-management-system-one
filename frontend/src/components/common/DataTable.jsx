import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Icon } from '@chakra-ui/react';
import { useMemo } from 'react';
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

  return (
    <Box width="100%" overflowX={{ base: 'scroll', md: 'auto' }}>
      <Table minW={{ base: '500px', md: 'lg' }} {...getTableProps()} size="lg" variant="striped" colorScheme="blue">
        <Thead bg="whitesmoke" color="blackAlpha.800">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())} borderBottomWidth="2px" >
                  <Box display="flex" alignItems="center" whiteSpace='normal'>
                    {column.render('Header')}
                    {/* Custom Sorting Icon */}
                    <Box pl={2}>
                      {column.isSorted ? (column.isSortedDesc ? <Icon as={FaSortDown} /> : <Icon as={FaSortUp} />) : <Icon as={FaSort} />}
                    </Box>
                  </Box>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()} bg="gray.200"  _hover={{ bg: "red" }}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr  {...row.getRowProps()} >
                {row.cells.map((cell) => {
                  return <Td bg={'gray.300'}  {...cell.getCellProps()} py={4} verticalAlign="middle">{cell.render('Cell')}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default DataTable;
