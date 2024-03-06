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
    <Box bg={bgColor} borderRadius={{ sm: '2xl', md: '2xl', lg: 'sm' }}>
      <Heading
        as="h3"
        size="sm"
        textAlign="start"
        ml={4}
        mt={10}
        color={textColor}
      >
        Billing Info
      </Heading>
      <Box maxW="400px" mx="auto" mt="20px" mb={10} p={4}>
        <VStack spacing={4}>
          <Input
            id="name"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            bg={'gray.600'}
          />
          <Input
            id="address"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            bg={'gray.600'}
          />
          <Input
            id="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            bg={'gray.600'}
          />
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            bg={'gray.600'}
          />
        </VStack>
      </Box>
    </Box>
  )
}

export default UserInfo
