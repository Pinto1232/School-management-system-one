import React, { useState } from 'react';
import { Box, Flex, Text, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { addMonths, subMonths, format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';

const Calendar = ({ onDateSelect }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const startDay = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 6 });
    const endDay = endOfWeek(endOfMonth(currentDate));

    const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    const nextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const prevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const dayIsInMonth = (day) => {
        return isSameMonth(day, currentDate);
    };

    const onDayClick = (day) => {
        setSelectedDate(day);
        if (onDateSelect) {
            onDateSelect(day);
        }
    };

    const isSelectedDay = (day) => {
        return isSameDay(day, selectedDate);
    };

    const renderDaysOfWeek = () => {
        return daysOfWeek.map((day) => (
            <Text key={day} flex="1" textAlign="center" fontWeight="bold" color="gray.600">
                {day}
            </Text>
        ));
    };

    const renderDays = () => {
        const days = [];
        let day = startDay;

        while (day <= endDay) {
            for (let i = 0; i < 7; i++) {
                const isCurrentDay = isSameDay(day, new Date());
                const isSelected = isSelectedDay(day);
                days.push(
                    <Box
                        key={day.toString()}
                        flex="1"
                        height="40px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={isSelected ? 'teal.600' : (dayIsInMonth(day) ? 'teal.100' : 'gray.50')}
                        color={isSelected ? 'white' : (isCurrentDay ? 'teal.600' : 'gray.800')}
                        p={3}
                        m={0.5}
                        _hover={{ bg: isSelected ? 'teal.600' : 'teal.200', cursor: 'pointer' }}
                        onClick={() => onDayClick(day)}
                        borderRadius="md"
                    >
                        <Text fontWeight="semibold">
                            {format(day, 'd')}
                        </Text>
                    </Box>
                );
                day = addDays(day, 1);
            }
        }

        return days;
    };

    const gridHeight = useBreakpointValue({ base: '43vh', lg: '56vh' });

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" boxShadow="xl" height={gridHeight}>
            <Flex justifyContent="space-between" alignItems="center" bg="teal.500" color="white" p={4} borderRadius="lg">
                <IconButton
                    aria-label="Previous month"
                    icon={<ChevronLeftIcon />}
                    variant="ghost"
                    onClick={prevMonth}
                    _hover={{ bg: 'teal.600' }}
                    fontSize={24}
                />
                <Text fontSize="xl" fontWeight="bold">
                    {format(currentDate, 'MMMM yyyy')}
                </Text>
                <IconButton
                    aria-label="Next month"
                    icon={<ChevronRightIcon />}
                    variant="ghost"
                    onClick={nextMonth}
                    _hover={{ bg: 'teal.600' }}
                    fontSize={24}
                />
            </Flex>
            <Flex bg="gray.100" color={'black'} p={8}>
                {renderDaysOfWeek()}
            </Flex>
            <Flex flexWrap="wrap" p={2}>
                {renderDays()}
            </Flex>
        </Box>
    );
};

export default Calendar;