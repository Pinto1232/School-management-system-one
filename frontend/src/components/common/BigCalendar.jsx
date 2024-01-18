import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Heading,
  Button,
  IconButton,
  Tooltip,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const BigCalendar = ({ events }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Define the styles using useColorModeValue at the top level of the component
  const selectedBackgroundColor = useColorModeValue("#2b6cb0", "#63b3ed");
  const defaultBackgroundColor = useColorModeValue("#3182ce", "#90cdf4");

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  const EventModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent borderRadius="xl" mx={4} bg={useColorModeValue('white', 'gray.800')} boxShadow="2xl">
        <ModalHeader borderBottomWidth="1px" fontWeight="bold" fontSize="2xl" bg={useColorModeValue('blue.500', 'blue.600')} color="white">
          {selectedEvent?.title}
        </ModalHeader>
        <ModalCloseButton size="lg" color="white" />
        <ModalBody py={6} px={4}>
          <Text fontSize="lg" mb={4}>{selectedEvent?.description}</Text>
          <Text fontSize="md" fontWeight="medium" mb={2}>
            <strong>Date:</strong> {moment(selectedEvent?.start).format("dddd, MMMM Do YYYY")}
          </Text>
          <Text fontSize="md" fontWeight="medium">
            <strong>Time:</strong> {moment(selectedEvent?.start).format("h:mm a")} -{" "}
            {moment(selectedEvent?.end).format("h:mm a")}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = isSelected ? selectedBackgroundColor : defaultBackgroundColor;
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0",
      display: "block",
    };
    return {
      style,
    };
  };

  return (
    <Box bg={useColorModeValue("white", "gray.800")} p={4} boxShadow="2lg">
      <Heading as="h2" size="xl" mb={4} textAlign="center">
        Event Calendar
      </Heading>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: "48vh" }}
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter}
      />
      {selectedEvent && <EventModal />}
    </Box>
  );
};

BigCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default BigCalendar;