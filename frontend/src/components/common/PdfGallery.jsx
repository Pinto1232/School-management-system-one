import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, SimpleGrid, useColorModeValue, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, useDisclosure, Box, Image, VStack, Icon, HStack, Text } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import { Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';


const MotionModalContent = motion(ModalContent);

const PdfGalleryItem = ({ file }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(true);
    const bgColor = useColorModeValue('gray.50', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const buttonColorScheme = useColorModeValue('blue', 'teal');


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box
            p={5}
            borderRadius="lg"
            boxShadow="base"
            bg={'white'}
            _hover={{ boxShadow: 'md', transform: 'scale(1.05)' }}
            transition="all 0.3s ease-in-out"
            overflow="hidden"
            position="relative"
        >
            {isLoading && (
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    m="auto"
                />
            )}
            <Image
                src={file.thumbnail}
                alt={`Thumbnail for ${file.title}`}
                borderRadius="md"
                objectFit="cover"
                onLoad={() => setIsLoading(false)}
                style={{ display: isLoading ? 'none' : 'block', width: '100%', height: '200' }}
                loading="lazy"
            />
            {!isLoading && (
                <Center
                    position="absolute"
                    top="-20"
                    right="0"
                    bottom="0"
                    left="0"
                    cursor={'pointer'}
                    onClick={onOpen}
                    zIndex={999}
                >
                    <Icon as={FaPlay} w={10} h={10} color="white" />
                </Center>
            )}
            <VStack spacing={3} align="stretch" mt={4}>
                <Text fontWeight="bold" color={textColor} noOfLines={1}>
                    {file.title}
                </Text>
                <HStack justifyContent="space-between" align="center">
                    {file.isFree ? (
                        <Button as="a" href={file.url} download colorScheme={buttonColorScheme}>
                            Download PDF
                        </Button>
                    ) : (
                        <>
                            <Button bg={'black'} color={'white'} fontSize="x-small" h={4} p={3} fontWeight={12} borderRadius={3} boxShadow={'lg'}>
                                Price: ${file.price}
                            </Button>
                            <Button colorScheme="green" onClick={file.onPurchase}>
                                Purchase Access
                            </Button>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
                                    <ModalOverlay />
                                    <MotionModalContent
                                        initial={{ y: -50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 50, opacity: 0 }}
                                        borderRadius="md"
                                        boxShadow="2xl"
                                    >
                                        <ModalHeader bg={'blue'} color="white">Purchase Access</ModalHeader>
                                        <ModalCloseButton color="black" />
                                        <ModalBody>
                                            <Text color="black">Complete your purchase for {file.title}.</Text>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="blue" mr={3} onClick={onClose}>
                                                Close
                                            </Button>
                                            <Button variant="ghost" onClick={() => alert('Purchased!')}>
                                                Pay ${file.price}
                                            </Button>
                                        </ModalFooter>
                                    </MotionModalContent>
                                </Modal>
                            </Modal>
                            {/* Test Button to Open Modal */}
                            <Button onClick={onOpen} colorScheme="pink" size="sm" position="absolute" top="2" right="2">
                                On Sale 50%
                            </Button>
                        </>
                    )}
                </HStack>
            </VStack>
        </Box>
    );
};

const PdfGallery = ({ files }) => {
    return (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
            {files.map((file) => (
                <PdfGalleryItem key={file.id} file={file} />
            ))}
        </SimpleGrid>
    );
};

export default PdfGallery;
