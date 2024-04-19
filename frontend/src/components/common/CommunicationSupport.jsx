import React from 'react'
import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Link,
  useColorModeValue,
  Icon,
  Divider,
  Stack,
  HStack
} from '@chakra-ui/react'
import { MdMessage, MdForum, MdLiveHelp, MdContactMail } from 'react-icons/md'
import { FaBook, FaUniversity, FaHeadset } from 'react-icons/fa'

const CommunicationSupport = ({
  onMessageClick,
  onForumClick,
  faqUrl,
  contactUrl,
}) => {
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.200')

  return (
    <Box bg={bgColor} p={5} borderRadius="sm" boxShadow="2xl" my={4} mx={4}>
      <VStack spacing={8} align="stretch">
        <Heading as="h3" size="lg" mb={4}>
          Communication & Support
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Button
            leftIcon={<Icon as={MdMessage} />}
            colorScheme="blue"
            onClick={onMessageClick}
            flex={1}
          >
            Message Instructor
          </Button>
          <Button
            leftIcon={<Icon as={MdForum} />}
            colorScheme="orange"
            onClick={onForumClick}
            flex={1}
          >
            Discussion Forum
          </Button>
        </Stack>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
          <Link href={faqUrl} isExternal flex={1}>
            <Button
              leftIcon={<Icon as={MdLiveHelp} />}
              colorScheme="green"
              w="full"
            >
              FAQs
            </Button>
          </Link>
          <Link href={contactUrl} isExternal flex={1}>
            <Button
              leftIcon={<Icon as={MdContactMail} />}
              colorScheme="red"
              w="full"
            >
              Contact Advisor
            </Button>
          </Link>
        </Stack>
        <Divider />
        <VStack alignItems="start" spacing={4}>
          <Text fontWeight="bold" fontSize="lg" color={textColor}>
            Additional Resources:
          </Text>
          <Link href="/academic-calendar" isExternal>
            <HStack spacing={1}>
              <FaBook />
              <Text
                fontSize="md"
                color={textColor}
                _hover={{ textDecoration: 'underline' }}
              >
                Academic Calendar
              </Text>
            </HStack>
          </Link>
          <Link href="/library-resources" isExternal>
            <HStack spacing={1}>
              <FaUniversity />
              <Text
                fontSize="md"
                color={textColor}
                _hover={{ textDecoration: 'underline' }}
              >
                Library Resources
              </Text>
            </HStack>
          </Link>
          <Link href="/technical-support" isExternal>
            <HStack spacing={1}>
              <FaHeadset />
              <Text
                fontSize="md"
                color={textColor}
                _hover={{ textDecoration: 'underline' }}
              >
                Technical Support
              </Text>
            </HStack>
          </Link>
        </VStack>
      </VStack>
    </Box>
  )
}

export default CommunicationSupport
