import React from 'react';
import { SimpleGrid, Box, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const ImageGallery = ({ images }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedImage, setSelectedImage] = React.useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(image);
        onOpen();
    };

    return (
        <Box>
            <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="10px">
                {images.map((image, index) => (
                    <Box key={index} onClick={() => handleImageClick(image)}>
                        <Image src={image.src} alt={image.alt} boxShadow="md" borderRadius="sm" />
                    </Box>
                ))}
            </SimpleGrid>

            {selectedImage && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{selectedImage.alt}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Image src={selectedImage.src} alt={selectedImage.alt} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};

export default ImageGallery;
