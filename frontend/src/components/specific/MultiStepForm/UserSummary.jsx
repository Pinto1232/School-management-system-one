import {
  VStack,
  Text,
  useColorModeValue,
  Box,
  Icon,
  Heading,
} from '@chakra-ui/react'
import { FaUser, FaEnvelope, FaClipboardList } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const UserSummary = ({ prevStep, handleSubmit }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const infoBgColor = useColorModeValue('gray.100', 'gray.600')
  const iconColor = useColorModeValue('blue.500', 'blue.300')

  const userPlan = useSelector((state) => state.userForm?.userPlan || {})
  const userInfo = useSelector((state) => state.userForm?.userInfo || {})

  console.log("user Plan", userPlan);

  return (
    <Box
      bg={bgColor}
      p={5}
      borderRadius="lg"
      shadow="md"
      maxW={{ base: '90%', md: '600px' }}
      mx="auto"
      my={5}
    >
      <Heading as="h3"  size="sm" textAlign="start" color={textColor} mb={4}>
        Your Summary
      </Heading>

      <VStack spacing={4} align="start" w="full">
        <Box bg={infoBgColor} p={3} borderRadius="md" w="full">
          <Icon as={FaUser} color={iconColor} mr={2} />
          <Text as="span" fontSize="md" fontWeight="bold" color={textColor}>
            Name:
          </Text>
          <Text as="span" ml={2} fontSize="md" color={textColor}>
            {userInfo.name || 'N/A'}
          </Text>
        </Box>
        <Box bg={infoBgColor} p={3} borderRadius="md" w="full">
          <Icon as={FaEnvelope} color={iconColor} mr={2} />
          <Text as="span" fontSize="md" fontWeight="bold" color={textColor}>
            Email:
          </Text>
          <Text as="span" ml={2} fontSize="md" color={textColor}>
            {userInfo.email || 'N/A'}
          </Text>
        </Box>
        <Box bg={infoBgColor} p={3} borderRadius="md" w="full">
          <Icon as={FaEnvelope} color={iconColor} mr={2} />
          <Text as="span" fontSize="md" fontWeight="bold" color={textColor}>
            Phone:
          </Text>
          <Text as="span" ml={2} fontSize="md" color={textColor}>
            {userInfo.phoneNumber || 'N/A'}
          </Text>
        </Box>
        <Box bg={infoBgColor} p={3} borderRadius="md" w="full">
          <Icon as={FaClipboardList} color={iconColor} mr={2} />
          <Text as="span" fontSize="md" fontWeight="bold" color={textColor}>
            Plan Name:
          </Text>
          <Text as="span" ml={2} fontSize="md" color={textColor}>
            {userPlan.planName || 'N/A'}
          </Text>
        </Box>
      </VStack>
    </Box>
  )
}

export default UserSummary
