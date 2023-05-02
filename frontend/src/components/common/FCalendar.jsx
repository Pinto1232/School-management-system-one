import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const FCalendar = ({ events, plugins, initialView, height, ...rest }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDate("");
  };

  return (
    <Box {...rest}>
      <FullCalendar
        plugins={
          Array.isArray(plugins)
            ? [dayGridPlugin, timeGridPlugin, interactionPlugin, ...plugins]
            : [dayGridPlugin, timeGridPlugin, interactionPlugin]
        }
        initialView={initialView}
        height={height}
        events={events}
        selectable={true}
        dateClick={handleDateClick}
      />
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Selected Date</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>You clicked on: {selectedDate}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default FCalendar;
