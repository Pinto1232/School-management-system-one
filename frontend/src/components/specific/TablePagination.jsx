import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Flex,
} from '@chakra-ui/react';

const TablePagination = ({
    columnsPagination,
    dataPagination,
    itemsPerPage,
    borderColor,
    headerColor,
    headerTextColor,
    rowColor,
    rowTextColor,
    evenRowColor,
    oddRowColor,
    paginationBgColor,
    paginationActiveColor,
    paginationInactiveColor,
    paginationHoverColor,
    paginationSize,
}) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(dataPagination.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const slicedData = dataPagination.slice(startIndex, endIndex);

    return (
        <Table size="md" variant="simple" borderColor={borderColor}>
            <Thead bg={headerColor} color={headerTextColor}>
                <Tr>
                    {columnsPagination.map((column) => (
                        <Th key={column.key}>{column.title}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {slicedData.map((row, index) => (
                    <Tr
                        key={row.id}
                        bg={index % 2 === 0 ? evenRowColor : oddRowColor}
                        color={rowTextColor}
                    >
                        {columnsPagination.map((column) => (
                            <Td key={`${row.id}-${column.key}`}>{row[column.key]}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
            {totalPages > 1 && (
                <tfoot>
                  <Tr>
                    <Td bg="#fff" colSpan={columnsPagination.length}>
                      <Flex
                        style={{ width: "100%" }}
                        bg={paginationBgColor}
                        justify="start"
                        align="start" 
                        py={1}
                      >
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            size={paginationSize}
                            variant={
                              currentPage === page ? "solid" : "ghost"
                            }
                            bg={
                              currentPage === page
                                ? paginationActiveColor
                                : paginationInactiveColor
                            }
                            _hover={{
                              bg: paginationHoverColor,
                            }}
                            mx={1}
                            onClick={() => handleClick(page)}
                          >
                            {page}
                          </Button>
                        ))}
                      </Flex>
                    </Td>
                  </Tr>
                </tfoot>
              )}              
        </Table>
    );
};

TablePagination.propTypes = {
    columnsPagination: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    dataPagination: PropTypes.arrayOf(PropTypes.object).isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    borderColor: PropTypes.string,
    headerColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    rowColor: PropTypes.string,
    rowTextColor: PropTypes.string,
    evenRowColor: PropTypes.string,
    oddRowColor: PropTypes.string,
    paginationBgColor: PropTypes.string,
    paginationActiveColor: PropTypes.string,
    paginationInactiveColor: PropTypes.string,
    paginationHoverColor: PropTypes.string,
    paginationSize: PropTypes.string,
};

TablePagination.defaultProps = {
    borderColor: 'gray.300',
    headerColor: 'gray.100',
    headerTextColor: 'gray.700',
    rowColor: 'white',
    rowTextColor: 'gray.700',
    evenRowColor: 'gray.100',
    oddRowColor: 'white',
    paginationBgColor: 'white',
    paginationActiveColor: 'gray.500',
    paginationInactiveColor: 'gray.200',
    paginationHoverColor: 'gray.300',
    paginationSize: 'md',
};

export default TablePagination;

