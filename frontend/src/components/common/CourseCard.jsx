import React, { useState } from 'react'
import {
  Box,
  Image,
  Text,
  Flex,
  IconButton,
  useColorModeValue,
  Badge,
  Spinner,
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

const CourseCard = ({
  title,
  description,
  imageUrl,
  duration,
  level,
  onFavoriteToggle,
  isFavorite,
  isLoading,
  badge,
  rating,
}) => {
  const [favorite, setFavorite] = useState(isFavorite)
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.700', 'white')

  const handleFavoriteClick = () => {
    setFavorite(!favorite)
    if (onFavoriteToggle) {
      onFavoriteToggle(!favorite)
    }
  }

  if (isLoading) {
    return (
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg={cardBg}
        boxShadow="xl"
        w="100%"
        p="4"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="xl" />
      </Box>
    )
  }

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      boxShadow="2xl"
      width={280}
      height={410}
      transition="transform 0.3s ease-in-out"
      _hover={{
        transform: 'scale(1.10)',
        cursor: 'pointer'
      }}
    >
      <Image
        transition="transform 0.3s ease-in-out"
        _hover={{
          transform: 'scale(1.05)',
          cursor: 'pointer'
        }}
        src={imageUrl}
        alt={title}
        width="100%"
        height="209px"
        objectFit="cover"
      />
      <Box p="6">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="xl" color={textColor}>
            {title}
          </Text>
          <IconButton
            aria-label="Favorite"
            icon={<StarIcon />}
            colorScheme={favorite ? 'yellow' : 'gray'}
            variant="ghost"
            onClick={handleFavoriteClick}
          />
        </Flex>
        <Text mt="2" color={textColor} fontSize="sm">
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
  )
}

export default CourseCard
