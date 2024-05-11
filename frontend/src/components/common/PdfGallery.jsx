import React, { useEffect, useState } from 'react'
import {
  SimpleGrid,
  useColorModeValue,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Box,
  Image,
  VStack,
  HStack,
  Text,
  Center,
  Icon,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { motion } from 'framer-motion'


const PdfGalleryItem = ({ file }) => {
  const [isLoading, setIsLoading] = useState(true)
  const buttonColorScheme = useColorModeValue('blue', 'teal')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])


  return (
    <Box
      borderRadius="xl"
      boxShadow="2xl"
      bg={'gray.50'}
      _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}
      transition="all 0.3s ease-in-out"
      overflow="hidden"
      position="relative"
      width="100%"
      height="290px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
      <Image
        src={file.thumbnail}
        alt={`Thumbnail for ${file.title}`}
        borderRadius="md"
        objectFit="cover"
        onLoad={() => setIsLoading(false)}
        style={{
          display: isLoading ? 'none' : 'block',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
        loading="lazy"
      />
      {!isLoading && (
        <Center
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          zIndex="3"
          cursor="pointer"
        >
          <Icon as={FaPlay} w={10} h={10} color="white" />
        </Center>
      )}
      <VStack
        spacing={3}
        align="stretch"
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        p={4}
        justifyContent="end"
        color="white"
        zIndex="2"
        bg="rgba(0, 0, 0, 0.4)"
      >
        <Text fontWeight="semibold" noOfLines={1}>
          {file.title}
        </Text>
        <HStack justifyContent="space-between" align="center" width="100%">
          {file.isFree ? (
            <Button
              as="a"
              href={file.url}
              fontSize={12}
              download
              colorScheme={buttonColorScheme}
              w={'full'}
            >
              Download PDF
            </Button>
          ) : (
            <>
              <Button
                bg={'gray.800'}
                color={'white'}
                fontSize={10}
                h={6}
                p={2}
                fontWeight="bold"
                borderRadius="sm"
                boxShadow={'md'}
              >
                Price: ${file.price}
              </Button>
              <Button
                colorScheme="green"
                fontSize={12}
                onClick={file.onPurchase}
              >
                Purchase Access
              </Button>
            </>
          )}
        </HStack>
      </VStack>
    </Box>
  )
}

const PdfGallery = ({ files }) => {
  const safeFiles = Array.isArray(files) ? files : []

  return (
    <Box display="flex" justifyContent="center">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {safeFiles.map((file) => (
          <PdfGalleryItem key={file.id} file={file} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default PdfGallery
