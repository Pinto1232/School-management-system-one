import React from 'react';
import { Box, VStack, Text, Image, Flex } from '@chakra-ui/react';
import CustomButton from './CustomButton';
import { useColorModeValue } from '@chakra-ui/react'


const SubscriptionCard = ({ title, price, features, imageUrl }) => {

    {/* TODO: */ }
    const textColor = useColorModeValue('#4A5568', '#fff');
    const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');
    const buttonColor = useColorModeValue('#319795', '#3182ce');
    const textButton = useColorModeValue('#4A5568', '#fff')


    return (
        <Box
            bg={backgroundColor}
            borderRadius="lg"
            overflow="hidden"
            p={6}
            boxShadow="sm"
            w="100%"
            height="655px"
            maxW="350px"
        >
            <Image src={imageUrl} alt={title} maxW="100%" width="300px" height="200px" objectFit="cover" />
            <VStack alignItems="start" spacing={6} mt={4}>
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>
                    {title}
                </Text>
                <Text fontSize="4xl" fontWeight="bold" color={textColor}>
                    R{price}
                </Text>
                <Flex w='100%'>
                    <CustomButton
                        bg={buttonColor}
                        color={textButton}
                        hover={buttonColor}
                        style={{
                            width: "300px",
                            color: "white"
                        }}
                    >
                        Subscribe Now
                    </CustomButton>
                </Flex>
                <Text fontSize="lg" fontWeight="semibold" color={textColor}>
                    Features
                </Text>
                <VStack alignItems="start" spacing={2} >
                    {features.map((feature, index) => (
                        <Text key={index} fontSize="md" color={textColor}>
                            {feature}
                        </Text>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
};

export default SubscriptionCard;
