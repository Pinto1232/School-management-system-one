import { useState } from "react";
import { Box, Flex, IconButton, Select, Table, Tbody, Td, Th, Thead,Tr,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";


const Calendar = ({ initialDate, onDateClick, monthOptions, minYear, maxYear }) => {
    const today = new Date();
    const [selectedMonth, setSelectedMonth] = useState(
        initialDate ? initialDate.getMonth() + 1 : today.getMonth() + 1
    );
    const [selectedYear, setSelectedYear] = useState(
        initialDate ? initialDate.getFullYear() : today.getFullYear()
    );
    const [selectedDate, setSelectedDate] = useState(
        initialDate ? initialDate.getDate() : null
    );

    const handlePrevMonth = () => {
        setSelectedMonth((prevMonth) => (prevMonth === 1 ? 12 : prevMonth - 1));
        setSelectedYear((prevYear) =>
            selectedMonth === 1 ? prevYear - 1 : prevYear
        );
    };



    const handleNextMonth = () => {
        setSelectedMonth((prevMonth) => (prevMonth === 12 ? 1 : prevMonth + 1));
        setSelectedYear((prevYear) =>
            selectedMonth === 12 ? prevYear + 1 : prevYear
        );
    };


    const handleMonthChange = (e) => {
        setSelectedMonth(parseInt(e.target.value));
    };

    const handleYearChange = (e) => {
        setSelectedYear(parseInt(e.target.value));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        onDateClick(date);
    };

    const getDaysInMonth = () => {
        const daysInMonth = [];
        const daysCount = new Date(selectedYear, selectedMonth, 0).getDate();

        for (let i = 1; i <= daysCount; i++) {
            daysInMonth.push(i);
        }

        return daysInMonth;
    };

    const daysInMonth = getDaysInMonth();

    return (
        <Box>
            <Flex align="center" mb={4}>
                <IconButton
                    icon={<ChevronLeftIcon />}
                    aria-label="Previous month"
                    onClick={handlePrevMonth}
                />
                <Select
                    width="150px"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                >
                    {monthOptions.map(({ value, label }) => (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    ))}
                </Select>
                <Select
                    width="80px"
                    value={selectedYear}
                    onChange={handleYearChange}
                >
                    {Array.from(
                        { length: maxYear - minYear + 1 },
                        (_, i) => minYear + i
                    ).map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </Select>
                <IconButton
                    icon={<ChevronRightIcon />}
                    aria-label="Next month"
                    onClick={handleNextMonth}
                />
            </Flex>
            <Table variant="simple" size="sm">
                <Thead>
                    <Tr>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <Th key={day}>{day}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {daysInMonth.map((day) => (
                        <Tr key={day}>
                            {[0, 1, 2, 3, 4, 5, 6].map((weekday) => {
                                const date = new Date(selectedYear, selectedMonth - 1, day);
                                const dayOfWeek = date.getDay();

                                if (dayOfWeek !== weekday) {
                                    return <Td key={weekday} />;
                                }

                                return (
                                    <Td
                                        key={weekday}
                                        onClick={() => handleDateClick(day)}
                                        bg={selectedDate === day ? "blue.100" : undefined}
                                        _hover={{ bg: "gray.100", cursor: "pointer" }}
                                    >
                                        {day}
                                    </Td>
                                );
                            })}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    )
};

export default Calendar;