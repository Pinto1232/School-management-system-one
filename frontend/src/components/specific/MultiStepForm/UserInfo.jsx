import {
  Box,
  Heading,
  useColorModeValue,
  VStack,
  Input,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

const UserInfo = ( ) => {
  const bgColor = useColorModeValue('gray.200', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.200')

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  })

 /*  useEffect(() => {
    const isValid = formData.name.trim() && formData.email.trim()
    onFormValidityChange(isValid)
  }, [formData, onFormValidityChange]) */

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  return (
    <Box bg={bgColor} borderRadius="2xl" p={5}>
    <Heading as="h3" size="lg" textAlign="start" ml={5} mt={5} color={textColor}>
      Billing Info
    </Heading>
    <Box maxW="400px" mx="auto" mt="20px" mb={10} p={5}>
      <VStack spacing={5}>
        <Input
          id="name"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          bg="gray.600"
          size="lg"
        />
        <Input
          id="address"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          bg="gray.600"
          size="lg"
        />
        <Input
          id="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          bg="gray.600"
          size="lg"
        />
        <Input
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          bg="gray.600"
          size="lg"
        />
      </VStack>
    </Box>
  </Box>
  
  )
}

export default UserInfo
