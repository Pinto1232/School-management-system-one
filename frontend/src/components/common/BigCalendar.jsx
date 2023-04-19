import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    Box,
    Flex,
    useTheme,
    Heading,
    Button,
    IconButton,
    Tooltip,
    useColorMode,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverHeader
} from "@chakra-ui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";

const BigCalendar = ({ events }) => {
    const localizer = momentLocalizer(moment);
    const theme = useTheme();
    const { colorMode } = useColorMode();
    const [popoverEvent, setPopoverEvent] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const customToolbar = toolbar => {
        const goToToday = () => {
            toolbar.onViewChange("month");
            toolbar.onNavigate(new Date());
        };

        return (
            <Flex
                justifyContent="space-between"
                alignItems="center"
                mb={4}
                px={4}
                color={colorMode === "light" ? "gray.700" : "gray.400"}
            >
                <Heading as="h3" size="md">
                    {toolbar.label}
                </Heading>

                <Flex>
                    <Button
                        size="sm"
                        variant="solid"
                        colorScheme="primary"
                        mr={2}
                        onClick={goToToday}
                    >
                        Today
                    </Button>

                    <Tooltip label="Previous" placement="top">
                        <IconButton
                            icon={<i className="fas fa-chevron-left" />}
                            size="sm"
                            variant="ghost"
                            aria-label="Previous"
                            onClick={() => toolbar.onNavigate("PREV")}
                        />
                    </Tooltip>

                    <Tooltip label="Next" placement="top">
                        <IconButton
                            icon={<i className="fas fa-chevron-right" />}
                            size="sm"
                            variant="ghost"
                            aria-label="Next"
                            onClick={() => toolbar.onNavigate("NEXT")}
                        />
                    </Tooltip>
                </Flex>
            </Flex>
        );
    };

    const handleEventClick = event => {
        setPopoverEvent(event);
        setShowDetails(true);
    };

    const handleClosePopover = () => {
        setPopoverEvent(null);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
    };

    return (
        <Box
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
            p={4}
        >
            {!showDetails && (
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    components={{ toolbar: customToolbar }}
                    style={{ height: 500 }}
                    onSelectEvent={handleEventClick}
                />
            )}


            {showDetails && (
                <Box>

                    <Flex justifyContent="space-between" maxW="4xl" border={0} mx="auto" mt={10} borderWidth={1} rounded="md">
                        <Button onClick={handleCloseDetails}>Back to Events</Button>
                        <Box>Pinto</Box>
                    </Flex>

                    <Box mt={4}>
                        {selectedEvent && (
                            <Heading as="h3" size="md">
                                {selectedEvent.title}
                            </Heading>
                        )}
                        <Box>
                            {selectedEvent && (
                                <Text>{selectedEvent.description}</Text>
                            )}
                            {selectedEvent && (
                                <Text>
                                    {moment(selectedEvent.start).format("dddd, MMMM Do YYYY")}
                                </Text>
                            )}

                            {selectedEvent && (
                                <Text>
                                    {moment(selectedEvent.start).format("h:mm a")} -{" "}
                                    {moment(selectedEvent.end).format("h:mm a")}
                                </Text>
                            )}
                        </Box>
                    </Box>
                </Box>
            )}

            <Popover
                isOpen={!!popoverEvent}
                onClose={handleClosePopover}
                placement="auto"
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    <div style={{ display: "none" }}></div>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader>
                        {popoverEvent?.title}
                    </PopoverHeader>
                    <PopoverBody>
                        <p>
                            Start Time:{" "}
                            {moment(popoverEvent?.start).format("h:mm a")}
                        </p>
                        <p>
                            End Time:{" "}
                            {moment(popoverEvent?.end).format("h:mm a")}
                        </p>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    );
};

BigCalendar.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            start: PropTypes.instanceOf(Date),
            end: PropTypes.instanceOf(Date),
        })
    ).isRequired,
};

export default BigCalendar;
