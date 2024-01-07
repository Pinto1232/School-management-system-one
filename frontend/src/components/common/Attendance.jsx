import React, { useState } from 'react';
import { Select, Box, Text, VStack, Heading, Flex } from '@chakra-ui/react';

const Attendance = ({ onDateRangeChange, presentCount, absentCount, bgBack, bordeRad, ...props }) => {
    const [dateRange, setDateRange] = useState('today');

    const handleDateRangeChange = (event) => {
        const selectedRange = event.target.value;
        setDateRange(selectedRange);
        if (onDateRangeChange) {
            onDateRangeChange(selectedRange);
        }
    };

    return (
        <VStack bgGradient={bgBack} borderRadius={bordeRad} alignItems="start" {...props} p={4} h={'290px'}>
            <Heading as="h3" size="lg">Attendance</Heading>
            <Box w="100px" mt={'50px'}>
                <Select cursor={'pointer'} placeholder="Select date range" value={dateRange} onChange={handleDateRangeChange} border="none" sx={{ '&:focus': { outline: 'none', boxShadow: 'none' } }}>
                    <option value="today">Today</option>
                    <option value="lastWeek">Last week</option>
                </Select>
            </Box>
            <Flex justifyContent={'space-between'} gap={8} w="full">
                <Text fontSize="lg">Present: {presentCount}</Text>
                <Text fontSize="lg">Absent: {absentCount}</Text>
            </Flex>
        </VStack>
    );
};

export default Attendance;