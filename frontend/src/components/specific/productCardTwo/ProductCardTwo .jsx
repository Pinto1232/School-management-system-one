import { useState } from "react";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

const ProductCardTwo = ({ imageUrl, title, description, price }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
        <Image src={imageUrl} alt={title} onClick={onOpen} />
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Box fontWeight="semibold" fontSize="lg" mr="2">
              {title}
            </Box>
            <Box fontSize="sm" color="gray.500">
              {price}
            </Box>
          </Box>

          <Box mt="1" fontSize="sm">
            {description}
          </Box>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <Image src={imageUrl} alt={title} />
            <Box mt="1" fontSize="sm">
              {description}
            </Box>
            <Box mt="2" fontWeight="bold">
              {price}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Add to cart</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCardTwo;
