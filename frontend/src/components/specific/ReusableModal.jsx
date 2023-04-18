import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Box,
} from "@chakra-ui/react";

const ReusableModal = ({ buttonText, modalTitle, modalContent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    onOpen();
  };

  const handleCloseModal = () => {
    onClose();
  };

  const handleConfirmModal = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 2000);
  };

  return (
    <Box>
      <Button onClick={handleButtonClick}>{buttonText}</Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalBody>{modalContent}</ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal} mr={3}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleConfirmModal}
              isLoading={isLoading}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ReusableModal;
