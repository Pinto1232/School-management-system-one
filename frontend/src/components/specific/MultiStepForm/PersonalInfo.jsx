import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react'
import { useState } from 'react'
import ValidatedDropdown from './sub-components/ValidatedDropdown'

const PersonalInfo = ({ nextStep }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const isNameValid = name => name.length > 2;

  return (
    <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="md" mt={12}>
      <Heading as="h3" size="lg" textAlign="start" color={textColor} mb={16}>
        Tell us more about your needs
      </Heading>
      <Heading as="h6" size="sm" textAlign="start" color={textColor} mt={-10}>
        Address details
      </Heading>
      <Flex gap={2}>
        <Box>
          <VStack spacing={4}>
            <ValidatedDropdown
              value={name}
              onChange={handleNameChange}
              isValid={isNameValid}
            />
          </VStack>
        </Box>

        <Box>
          <VStack spacing={4}>
            <ValidatedDropdown
              value={name}
              onChange={handleNameChange}
              isValid={isNameValid}
            />
          </VStack>
        </Box>
        <Box>
          <VStack spacing={4}>
            <ValidatedDropdown
              value={name}
              onChange={handleNameChange}
              isValid={isNameValid}
            />
          </VStack>
        </Box>
        <Box>
          <VStack spacing={4}>
            <ValidatedDropdown
              value={name}
              onChange={handleNameChange}
              isValid={isNameValid}
            />
          </VStack>
        </Box>
      </Flex>
    </Box>
  )
}

export default PersonalInfo
