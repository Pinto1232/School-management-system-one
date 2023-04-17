import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
  Stack,
  Text,
  Box,
} from '@chakra-ui/react';

const PaginationTable = ({ data, columns, rowsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const startRow = currentPage * rowsPerPage;
  const endRow = (currentPage + 1) * rowsPerPage;

  const pageData = data.slice(startRow, endRow);

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.key}>{column.title}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {pageData.map((row, index) => (
            <Tr key={index}>
              {columns.map((column) => (
                <Td key={column.key}>{row[column.key]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Flex justifyContent="space-between" alignItems="center" mt="4">
        <Stack direction="row" spacing="4">
          <Button
            onClick={handlePrevPage}
            isDisabled={currentPage === 0}
            colorScheme="teal"
          >
            Prev
          </Button>
          <Button
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages - 1}
            colorScheme="teal"
          >
            Next
          </Button>
        </Stack>
        <Text>
          Showing {startRow + 1}-{Math.min(endRow, data.length)} of{' '}
          {data.length} entries
        </Text>
      </Flex>
    </Box>
  );
};

export default PaginationTable;
