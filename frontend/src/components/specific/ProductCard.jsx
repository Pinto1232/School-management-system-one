import React from 'react';
import { Box, Image, Badge, Heading, Text } from '@chakra-ui/react';

const ProductCard = ({ imageUrl, title, price, badgeText, badgeColor }) => {
    return (
        <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
        >
            <Image src={imageUrl} alt={title} />

            <Box p="6">
                <Box d="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme={badgeColor}>
                        {badgeText}
                    </Badge>
                </Box>

                <Heading mt="1" fontSize="xl" fontWeight="semibold" lineHeight="tight">
                    {title}
                </Heading>

                <Text mt="2" color="gray.500">
                    {price}
                </Text>
            </Box>
        </Box>
    );
};

export default ProductCard;
