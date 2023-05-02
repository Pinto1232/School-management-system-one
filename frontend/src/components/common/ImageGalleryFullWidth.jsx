import React, { useState } from "react";
import {
  Grid,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";

const ImageGalleryFullWidth = ({ imagesA }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setIsOpen(true);
    setSelectedImage(image);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedImage("");
  };
  return (
    <Box>
      <Grid
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={4}
        justifyContent="center"
        alignItems="center"
      >
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            onClick={() => handleImageClick(image)}
            cursor="pointer"
            w="100%"
            h="auto"
            objectFit="cover"
            borderRadius="md"
          />
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={handleClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedImage.alt}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0}>
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              w="100%"
              h="100%"
              objectFit="contain"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ImageGalleryFullWidth;
