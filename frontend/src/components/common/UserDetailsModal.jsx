import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

const UserDetailsModal = ({ isOpen, onClose, user, modalWidth }) => {
  const [imageBlobUrl, setImageBlobUrl] = useState(null);

  useEffect(() => {
    if (user?.image) {
      // Extract the filename from the path and construct the URL
      const filename = user.image.split('\\').pop().split('/').pop();
      const imageUrl = `http://localhost:3001/api/users/uploads/${filename}`;

      // Fetch the image blob from the server
      fetch(imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          setImageBlobUrl(blobUrl);
        })
        .catch((error) => {
          console.error('Error fetching image data:', error);
        });
    }
  }, [user]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered > 
      <ModalOverlay
        bg="blackAlpha.300" // Semi-transparent background
        backdropFilter="blur(2px)" // Apply blur effect
      />
      <ModalContent width={modalWidth} maxWidth={modalWidth}>
        <ModalHeader>User Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody bg={'whiteAlpha.300'}>
          <VStack spacing={4} align="stretch">
            {imageBlobUrl && (
              <Image
                borderRadius="full"
                boxSize="100px"
                src={imageBlobUrl}
                alt={`${user?.firstName} ${user?.lastName}`}
              />
            )}
            <Text fontSize="lg">Name: {user?.firstName}</Text>
            <Text fontSize="lg">Last Name: {user?.lastName}</Text>
            <Text fontSize="lg">Email: {user?.email}</Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserDetailsModal;