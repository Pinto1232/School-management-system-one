import React, { useState } from "react";
import {
    Box,
    Grid,
    GridItem,
    Button,
    IconButton,
    useColorMode,
    Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";


const EventsCalendar = ({ eventsCalendar, onEventClick }) => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === "dark";

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [clickedEvent, setClickedEvent] = useState(null);
    const [showPopover, setShowPopover] = useState(false);

    

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getMonthName = (monthIndex) => monthNames[monthIndex];

    const getDaysInMonth = (month, year) =>
        new Date(year, month + 1, 0).getDate();

    const getFirstDayOfMonth = (month, year) =>
        new Date(year, month, 1).getDay();

    const renderHeader = () => (
        <Box>
            <Grid
                templateColumns="repeat(7, 1fr)"
                textAlign="center"
                fontWeight="bold"
                fontSize="lg"
                mb={4}
            >
                {daysOfWeek.map((day) => (
                    <GridItem key={day} py={2}>
                        {day}
                    </GridItem>
                ))}
            </Grid>
            <Grid templateColumns="repeat(7, 1fr)" textAlign="center">
                <GridItem colSpan={3}>
                    <Button
                        leftIcon={<ChevronLeftIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => setCurrentMonth(currentMonth - 1)}
                    >
                        {getMonthName(currentMonth - 1)}
                    </Button>
                </GridItem>
                <GridItem colSpan={1}>{getMonthName(currentMonth)}</GridItem>
                <GridItem colSpan={3}>
                    <Button
                        rightIcon={<ChevronRightIcon />}
                        size="sm"
                        variant="ghost"
                        onClick={() => setCurrentMonth(currentMonth + 1)}
                    >
                        {getMonthName(currentMonth + 1)}
                    </Button>
                </GridItem>
            </Grid>
        </Box>
    );

    const renderDays = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<GridItem key={`empty-${i}`} />);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const eventsForDay = eventsCalendar.filter((event) => {
                const eventDate = new Date(event.date);
                return (
                    eventDate.getDate() === i &&
                    eventDate.getMonth() === currentMonth &&
                    eventDate.getFullYear() === currentYear
                );
            });

            const dayStyle = {
                cursor: eventsForDay.length > 0 ? "pointer" : "default",
                opacity: eventsForDay.length > 0 ? 1 : 0.5,
            };

            days.push(
                <Popover key={`day-${i}`}>
                    <PopoverTrigger>
                        <GridItem
                            p={2}
                            borderRadius="md"
                            {...dayStyle}
                        >
                            {i}
                        </GridItem>
                    </PopoverTrigger>
                    {eventsForDay.length > 0 && (
                        <PopoverContent>
                            <PopoverHeader>{i} {getMonthName(currentMonth)} {currentYear}</PopoverHeader>
                            <PopoverBody>
                                {eventsForDay.map((event) => (
                                    <Box key={event.id} onClick={() => onEventClick(event)}>
                                        {event.name}
                                    </Box>
                                ))}
                            </PopoverBody>
                        </PopoverContent>
                    )}
                </Popover>
            );
        }

        const gridTemplateColumns =
            "repeat(7, minmax(0, " + 1 / 7 + "fr))";

        return (
            <Grid templateColumns={gridTemplateColumns} mb={8}>
                {days}
            </Grid>
        );
    };

    return (
        <Box>
            {renderHeader()}
            {renderDays()}
        </Box>
    );
};

export default EventsCalendar