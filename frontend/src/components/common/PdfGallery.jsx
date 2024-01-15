import React from 'react';
import { SimpleGrid, Box, Button, VStack, HStack, Text, useColorModeValue, Image, Heading } from '@chakra-ui/react';


const PdfGalleryItem = ({ file }) => {
    const bgColor = useColorModeValue('gray.50', 'gray.700');
    const textColor = useColorModeValue('gray.600', 'gray.200');
    const buttonColorScheme = useColorModeValue('blue', 'teal');

    return (
        <VStack spacing={10} align="stretch" bg={bgColor} p={5} borderRadius="md" boxShadow="xl">
            <Image src={file.thumbnail} alt={`Thumbnail for ${file.title}`} borderRadius="md" />
            <Text fontWeight="bold" color={textColor}>{file.title}</Text>
            <HStack spacing={4} align="center">
                {file.isFree ? (
                    <Button as="a" href={file.url} download colorScheme={buttonColorScheme}>
                        Download PDF
                    </Button>
                ) : (
                    <>
                        <Text fontSize="lg" color="gray.500">
                            Price: ${file.price}
                        </Text>
                        <Button colorScheme="green" onClick={file.onPurchase}>
                            Purchase Access
                        </Button>
                    </>
                )}
            </HStack>
        </VStack>
    );
};

const PdfGallery = ({ files }) => {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={3}>
            {files.map((file) => (
                <PdfGalleryItem key={file.id} file={file} />
            ))}
        </SimpleGrid>
    );
};

export default PdfGallery;