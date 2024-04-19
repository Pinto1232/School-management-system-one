import {
  VStack,
  Text,
  useColorModeValue,
  Box,
  Icon,
  Heading,
} from '@chakra-ui/react'
import { FaUser, FaEnvelope, FaClipboardList } from 'react-icons/fa'

const UserSummary = ({ prevStep, handleSubmit }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const infoBgColor = useColorModeValue('gray.100', 'gray.600');
  const iconColor = useColorModeValue('blue.500', 'blue.300');
  
  return (
    <Box bg={bgColor} p={6} borderRadius="xl" shadow="lg" maxW="600px" mx="auto" my={6}>
      <Heading as="h3" size="md" textAlign="start" color={textColor} mb={5}>
        Your Summary
      </Heading>
      <VStack spacing={5} align="start" w="full">
        {['Name', 'Email', 'Phone', 'Plan Name'].map((field) => (
          <Box key={field} bg={infoBgColor} p={4} borderRadius="md" w="full">
            <Icon as={FaUser} color={iconColor} mr={3} />
            <Text as="span" fontSize="lg" fontWeight="bold" color={textColor}>
              {field}:
            </Text>
            <Text as="span" ml={3} fontSize="lg" color={textColor}></Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
  
}

export default UserSummary
