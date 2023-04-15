import React from 'react';
import { Box, VStack, Text, Image, Flex } from '@chakra-ui/react';
import CustomButton from './CustomButton';
import { useColorModeValue } from '@chakra-ui/react'


const SubscriptionCard = ({ title, price, features, imageUrl }) => {

    {/* TODO: */}
    const textColor = useColorModeValue('#4A5568', '#fff');
    const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');


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
                    <CustomButton
                        style={{
                            backgroundColor: "#3182CE",
                            width: "300px",
                            color: "white"
                        }}
                    >
                        Subscribe Now
                    </CustomButton>
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
