import React from 'react';
import { Box, VStack, Text, Button, useColorModeValue, Image, Flex } from '@chakra-ui/react';


const SubscriptionCard = ({ title, price, features, buttonText, onSubscribe, imageUrl }) => {
    const bg = useColorModeValue('gray.50', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.600');
    const color = useColorModeValue('gray.800', 'gray.200');

    return (
        <Box
            bg="white"
            borderWidth="1px"
            borderColor="gray.200"
            borderRadius="lg"
            overflow="hidden"
            p={6}
            boxShadow="sm"
            w="100%"
            height="655px"
            maxW="350px"
        >
            <Image src={imageUrl} alt={title} w="100%" objectFit="cover" />
            <VStack alignItems="start" spacing={6} mt={4}>
                <Text fontSize="2xl" fontWeight="bold" color="black">
                    {title}
                </Text>
                <Text fontSize="4xl" fontWeight="bold" color="black">
                    ${price}
                </Text>
                <Flex w='100%'>
                <Button  onClick={onSubscribe} colorScheme="blue"  width="100%">
                    {buttonText}
                </Button>
                </Flex>
                <Text fontSize="lg" fontWeight="semibold" color="black">
                    Features
                </Text>
                <VStack alignItems="start" spacing={2} >
                    {features.map((feature, index) => (
                        <Text key={index} fontSize="md" color="black">
                            {feature}
                        </Text>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
};

export default SubscriptionCard;
