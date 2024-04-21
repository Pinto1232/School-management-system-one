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
            as="h2"
            fontSize={'40px'}
            color={useColorModeValue('white', 'white')}
          >
            Welcome: {user?.firstName} {user?.lastName}
          </Heading>
          <Heading as="h3" size="md" color={'white'}>
            Access your personalized dashboard for all your educational needs
            and updates
          </Heading>
          <Flex
            gap={1}
            bg={'white'}
            py={2}
            px={2}
            w={'20.3em'}
            mt={4}
            borderRadius={8}
            boxShadow={'lg'}
          >
            <Box>
              <Button
                w={150}
                colorScheme="teal"
                borderRadius={0}
                onClick={() => {
                  onAnalyticsClick()
                  onClose()
                }}
              >
                View Analytics
              </Button>
            </Box>
            <Box>
              <Button
                w={150}
                bg={'#e53e3e'}
                colorScheme="teal"
                borderRadius={0}
                onClick={() => {
                  onAnalyticsClick()
                  onClose()
                }}
              >
                Analytics
              </Button>
            </Box>
          </Flex>
        </Flex>
        <Flex direction="column" justifyContent="center" w="50%" h="full" p={0}>
          <Image
            src="https://pngimg.com/d/student_PNG62548.png"
            alt="Right side image"
            w="full"
            h="full"
            pt={4}
            objectFit="contain"
          />
        </Flex>
      </Flex>
    </Box>
  )
}

export default WelcomeCard
