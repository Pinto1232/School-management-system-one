import React, { useState } from 'react';
import { Box, Image, Text, Flex, IconButton, useColorModeValue, Badge } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const CourseCard = ({ title, description, imageUrl, duration, level, onFavoriteToggle, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.700', 'white');

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    if (onFavoriteToggle) {
      onFavoriteToggle(!favorite);
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={cardBg} boxShadow="sm" w="100%">
      <Image src={imageUrl} alt={title} width="100%" height="50px" objectFit="cover" />
      <Box p="4">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="xl" color={textColor}>
            {title}
          </Text>
          <IconButton
            aria-label="Favorite"
            icon={<StarIcon />}
            colorScheme={favorite ? 'yellow' : 'gray'}
            onClick={handleFavoriteClick}
          />
        </Flex>
        <Text mt="1" color={textColor} fontSize="sm">
          {description}
        </Text>
        <Flex alignItems="center" mt="4" justifyContent="space-between">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {level}
          </Badge>
          <Text fontSize="sm" color={textColor}>
            {duration}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default CourseCard;