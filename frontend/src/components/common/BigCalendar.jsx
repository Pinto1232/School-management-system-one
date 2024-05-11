import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const BigCalendar = ({ events }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const selectedBackgroundColor = useColorModeValue("#2b6cb0", "#63b3ed");
  const defaultBackgroundColor = useColorModeValue("#3182ce", "#90cdf4");

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  const EventModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent mx={4} bg={useColorModeValue('white', 'gray.800')} boxShadow="sm">
        <ModalHeader borderBottomWidth="1px" fontWeight="bold" fontSize="lg" bg={useColorModeValue('blue.500', 'blue.600')} color="white" borderRadius="md">
          {selectedEvent?.title}
        </ModalHeader>
        <ModalCloseButton size="md" color="white" />
        <ModalBody py={4} px={3}>
          <Text fontSize="md" mb={3}>{selectedEvent?.description}</Text>
          <Text fontSize="sm" fontWeight="medium" mb={1}>
            <strong>Date:</strong> {moment(selectedEvent?.start).format("dddd, MMMM Do YYYY")}
          </Text>
          <Text fontSize="sm" fontWeight="medium">
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
      borderRadius: "0.375rem", // 6px
      opacity: 0.9,
      color: "white",
      border: "0",
      display: "block",
      padding: "0.2rem",
    };
    return {
      style,
    };
  };

  return (
    <Box bg={useColorModeValue("white", "gray.800")} p={6} boxShadow="base" borderRadius="lg">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: "60vh", borderRadius: "lg" }}
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