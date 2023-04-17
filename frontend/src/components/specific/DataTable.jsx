import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";



const DataTable = ({ columns, data }) => {
    return (
        <Box overflowX="auto">
            <Table size="md" variant="simple">
                <Thead>
                    <Tr>
                        {columns.map((column) => (
                            <Th key={column}>{column}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((row) => (
                        <Tr key={row.id}>
                            {columns.map((column) => (
                                <Td key={`${row.id}-${column}`}>{row[column]}</Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
}

export default DataTable
