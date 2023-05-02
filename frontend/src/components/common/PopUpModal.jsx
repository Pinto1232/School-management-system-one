import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

const PopupModal = ({
  triggerText,
  headerText,
  bodyText,
  confirmText,
  cancelText,
}) => {
  const [isOpenTwo, setIsOpenTwo] = useState(false);

  const handleOpen = () => setIsOpenTwo(true);
  const handleClose = () => setIsOpenTwo(false);
  const handleConfirm = () => {
    // Handle confirm action
    handleClose();
  };
  const handleCancel = () => {
    // Handle cancel action
    handleClose();
  };

  return (
    <Box>
      <Button onClick={handleOpen}>{triggerText}</Button>
      <Modal isOpen={isOpenTwo} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerText}</ModalHeader>
          <ModalBody>
            <Text>{bodyText}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleConfirm}>
              {confirmText}
            </Button>
            <Button onClick={handleCancel}>{cancelText}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PopupModal;
