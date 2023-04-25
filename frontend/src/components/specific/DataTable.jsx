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
} from '@chakra-ui/react';

const DataTable = (props) => {
    const {
        columns,
        datas,
        itemsPerPage,
        borderColor,
        headerColor,
        headerTextColor,
        rowColor,
        rowTextColor,
        evenRowColor,
        oddRowColor,
    } = props;

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(datas.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const slicedData = datas.slice(startIndex, endIndex);

    return (
        <Table size="md" variant="simple" borderColor={borderColor}>
            <Thead bg={headerColor} color={headerTextColor}>
                <Tr>
                    {columns.map((column) => (
                        <Th key={column.title}>{column.title}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {slicedData.map((row, index) => (
                    <Tr key={index} bg={index % 2 === 0 ? evenRowColor : oddRowColor} color={rowTextColor}>
                        {columns.map((column) => (
                            <Td key={`${row.id}-${column.title}`}>{row[column.key]}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
            <tfoot>
                <Tr>
                    <Td colSpan={columns.length}>
                        {totalPages > 1 && (
                            <div>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        colorScheme={currentPage === page ? 'green' : 'gray'}
                                        mr={2}
                                        onClick={() => handleClick(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                        )}
                    </Td>
                </Tr>
            </tfoot>
        </Table>
    );
};

DataTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    borderColor: PropTypes.string,
    headerColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    rowColor: PropTypes.string,
    rowTextColor: PropTypes.string,
    evenRowColor: PropTypes.string,
    oddRowColor: PropTypes.string,
};

DataTable.defaultProps = {
    itemsPerPage: 10,
    borderColor: 'gray.500',
    headerColor: 'gray.200',
    headerTextColor: '#fff',
    rowColor: 'gray.100',
    rowTextColor: 'gray.800',
    evenRowColor: 'gray.50',
    oddRowColor: 'white',
};

DataTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
    datas: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
        })
    ).isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    borderColor: PropTypes.string,
    headerColor: PropTypes.string,
    headerTextColor: PropTypes.string,
    rowColor: PropTypes.string,
    rowTextColor: PropTypes.string,
    evenRowColor: PropTypes.string,
    oddRowColor: PropTypes.string,
};

export default DataTable;
