import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  useColorModeValue,
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useUserContext } from '../../contexts/UserContext'

const WelcomeCard = ({ backgroundImage, onAnalyticsClick, onClose }) => {
  const { user } = useUserContext()

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users')
      console.log('Response data on welcome card:', response.data)
      const user = response.data[0]
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box
    w={{ base: '100%', md: '100%', lg: '100%' }}	
    ml={-2}
    h={300}
    mt={-6}
    bgImage={`url('${backgroundImage}')`}
    bgGradient="linear(to-r, blue.00, red.400)"
    bgPosition="center"
    bgRepeat="no-repeat"
    bgSize="cover"
    transition="background 0.3s ease-in-out"
    position="relative"
  >
    <Flex direction="row" justifyContent="space-between" h="full">
      <Flex direction="column" justifyContent="center" w="50%" p={'4%'}>
        <Heading
          as="h4"
          fontSize={'40px'}
          color={useColorModeValue('white', 'white')}
        >
          Welcome: {user?.firstName} {user?.lastName}
        </Heading>
        <Heading as="h3" size="md">
          Your Mathematics
        </Heading>
        <Button
          mt={4}
          w={200}
          colorScheme="teal"
          onClick={() => {
            onAnalyticsClick()
            onClose()
          }}
        >
          View Analytics
        </Button>
      </Flex>
      <Flex direction="column" justifyContent="center" w="50%" h="full" p={0}>
        <Image
          src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMjBfYV9jbG9zZV91cF9vZl9hX2NvbG9yZnVsX2ZsdWlkX2Fic3RyYWN0X3BhbGVfd18xYTg4YWI2Ny1jMzdmLTQ2ZTctYjk5OC1hMjI2N2U3YmI4ODBfMi5qcGc.jpg" // Replace with your image URL
          alt="Right side image"
          w="full"
          h="full"
          objectFit="cover"
        />
      </Flex>
    </Flex>
  </Box>
  
  )
}

export default WelcomeCard
