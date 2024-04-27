import React, { useState } from 'react'
import {
  Box,
  Flex,
  Text,
  IconButton,
  useBreakpointValue,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import {
  addMonths,
  subMonths,
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from 'date-fns'

const Calendar = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const startDay = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 6 })
  const endDay = endOfWeek(endOfMonth(currentDate))

  const daysOfWeek = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const dayIsInMonth = (day) => {
    return isSameMonth(day, currentDate)
  }

  const onDayClick = (day) => {
    setSelectedDate(day)
    if (onDateSelect) {
      onDateSelect(day)
    }
  }

  const isSelectedDay = (day) => {
    return isSameDay(day, selectedDate)
  }

  const renderDaysOfWeek = () => {
    return daysOfWeek.map((day) => (
      <Text
        key={day}
        flex="1"
        textAlign="center"
        fontWeight="semibold"
        color="teal.500"
      >
        {day}
      </Text>
    ))
  }

  const renderDays = () => {
    const days = [];
    let currentDay = startDay;
  
    const getBackgroundColor = (day) => {
      if (isSelectedDay(day)) return 'teal.500';
      if (dayIsInMonth(day)) return 'teal.100';
      return 'gray.200';
    };
  
    const getTextColor = (day) => {
      if (isSelectedDay(day)) return 'white';
      if (isSameDay(day, new Date())) return 'teal.500';
      return 'gray.500';
    };
  
    while (currentDay <= endDay) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <Box
            key={currentDay.toString()}
            flex="1"
            height="45px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={getBackgroundColor(currentDay)}
            color={getTextColor(currentDay)}
            p={3}
            m={0.5}
            _hover={{
              bg: isSelectedDay(currentDay) ? 'teal.600' : 'teal.200',
              cursor: 'pointer',
            }}
            onClick={() => onDayClick(currentDay)}
            borderRadius="md"
          >
              <Text as="span" mr={2}>Day</Text><Text fontWeight="semibold">{format(currentDay, 'd')}</Text>
          </Box>
        );
        currentDay = addDays(currentDay, 1);
      }
    }
  
    return days;
  };
  
  

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="2xl"
      width={'100%'}
      height={576}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        bg="teal.500"
        color="white"
        p={1}
        borderRadius="sm"
      >
        <IconButton
          aria-label="Previous month"
          icon={<ChevronLeftIcon />}
          size={20}
          padding={1}
          variant="outline"
          onClick={prevMonth}
          bg={'white'}
          _hover={{ bg: 'white', borderColor: 'white' }}
          fontSize={24}
          colorScheme="teal"
        />
        <Box textAlign="center" flex="1">
          {' '}
          <Text fontSize="xl" fontWeight="semibold">
            {format(currentDate, 'MMMM yyyy')}
          </Text>
        </Box>
        <IconButton
          aria-label="Next month"
          icon={<ChevronRightIcon />}
          size={20}
          padding={1}
          variant="outline"
          onClick={nextMonth}
          bg={'white'}
          _hover={{ bg: 'white', borderColor: 'white' }}
          fontSize={24}
          colorScheme="teal"
        />
      </Flex>
      <Flex bg="gray.100" color={'black'} fontSize={15} p={8}>
        {renderDaysOfWeek()}
      </Flex>
      <Flex flexWrap="wrap" p={1}>
        {renderDays()}
      </Flex>
    </Box>
  )
}

export default Calendar
