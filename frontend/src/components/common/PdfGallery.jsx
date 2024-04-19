import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
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
  Icon,
  HStack,
  Text,
  Grid
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import { Center } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionModalContent = motion(ModalContent)

const PdfGalleryItem = ({ file }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isLoading, setIsLoading] = useState(true)
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const buttonColorScheme = useColorModeValue('blue', 'teal')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Box
      p={2}
      borderRadius="xl"
      boxShadow="lg"
      bg={'gray.50'}
      _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}
      transition="all 0.3s ease-in-out"
      overflow="hidden"
      position="relative"
      width="290px"
      height="290px"
    >
      {isLoading && (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          m="auto"
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
          height: '200',
        }}
        loading="lazy"
      />
      {!isLoading && (
        <Center
          position="absolute"
          justifyContent={'center'}
          top="-150"
          right="0"
          bottom="0"
          left="0"
          cursor={'pointer'}
          onClick={onOpen}
          zIndex={999}
        >
          <Icon as={FaPlay} w={10} h={10} color="white" />
        </Center>
      )}
      <VStack spacing={3} align="stretch" mt={4}>
        <Text fontWeight="semibold" color={textColor} noOfLines={1}>
          {file.title}
        </Text>
        <HStack justifyContent="space-between" align="center">
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
              <Button colorScheme="green" fontSize={12} onClick={file.onPurchase}>
                Purchase Access
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  motionPreset="slideInBottom"
                >
                  <ModalOverlay />
                  <MotionModalContent
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    borderRadius="lg"
                    boxShadow="2xl"
                    bg="white"
                    color="black"
                  >
                    <ModalHeader
                      fontSize="lg"
                      fontWeight="bold"
                      borderBottomWidth="1px"
                    >
                      Purchase Access
                    </ModalHeader>
                    <ModalCloseButton color="gray.500" />
                    <ModalBody>
                      <Text fontSize="md">
                        Complete your purchase for {file.title}.
                      </Text>
                    </ModalBody>
                    <ModalFooter borderTopWidth="1px">
                      <Button
                        variant="outline"
                        colorScheme="blue"
                        mr={3}
                        onClick={onClose}
                      >
                        Close
                      </Button>
                      <Button
                        colorScheme="green"
                        onClick={() => alert('Purchased!')}
                      >
                        Pay ${file.price}
                      </Button>
                    </ModalFooter>
                  </MotionModalContent>
                </Modal>
              </Modal>
              {/* Test Button to Open Modal */}
              <Button
                onClick={onOpen}
                colorScheme="green"
                size="sm"
                fontSize={9}
                position="absolute"
                top="1"
                right="1"
              >
                On Sale{' '}
                <Text
                  bg={'black'}
                  p={'12px'}
                  mt={1}
                  ml={2}
                  borderRadius={'0px 0px 15px 15px'}
                >
                  {' '}
                  50%
                </Text>
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
