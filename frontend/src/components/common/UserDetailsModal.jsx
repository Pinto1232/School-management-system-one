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
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(2px)" />
  <ModalContent
    width={modalWidth}
    maxWidth={modalWidth}
    bg="white"
    boxShadow="2xl"
    borderRadius="lg"
    p={6}
  >
    <ModalHeader fontSize="2xl" fontWeight="bold" borderBottomWidth="1px" >
      User Details
    </ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <VStack spacing={4} align="stretch">
        {imageBlobUrl && (
          <Image
            borderRadius="full"
            boxSize="100px"
            src={imageBlobUrl}
            alt={`${user?.firstName} ${user?.lastName}`}
            objectFit="cover"
            border="2px"
            borderColor="gray.200"
          />
        )}
        <Text fontSize="lg" fontWeight="semibold">Name: {user?.firstName}</Text>
        <Text fontSize="lg" fontWeight="semibold">Last Name: {user?.lastName}</Text>
        <Text fontSize="lg" fontWeight="semibold">Email: {user?.email}</Text>
      </VStack>
    </ModalBody>
    <ModalFooter justifyContent="center" borderTopWidth="1px">
      <Button colorScheme="blue" mr={3} w="full" onClick={onClose}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

  );
};

export default UserDetailsModal;