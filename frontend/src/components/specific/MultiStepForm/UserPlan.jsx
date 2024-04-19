import {
  Box,
  Heading,
  useColorModeValue,
  useToast,
  RadioGroup,
  Radio,
  Container,
  Flex,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'

const UserPlan = ({ nextStep, prevStep }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')
  const [selectedPlan, setSelectedPlan] = useState('Basic')
  const toast = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()

    toast({
      title: 'Plan selected successfully.',
      description: `${selectedPlan}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const radioStyle = {
    cursor: 'pointer',
    borderWidth: '1px',
    borderRadius: 'full',
    boxShadow: 'lg',
    _checked: {
      bg: 'teal.600',
      color: 'white',
      borderColor: 'teal.600',
    },
    _focus: {
      boxShadow: 'outline',
    },
    px: 3,
    py: 3,
  };
  
  return (
    <Container maxW="container.md" centerContent>
      <Box bg={bgColor} borderRadius="2xl" p={5}>
        <Heading as="h3" size="md" textAlign="start" mt={5} ml={5} color={textColor}>
          Select Your Plan
        </Heading>
        <form onSubmit={handleSubmit}>
          <RadioGroup onChange={setSelectedPlan} value={selectedPlan}>
            <Flex
              spacing={5}
              mt={5}
              bg="gray.600"
              borderRadius="lg"
              boxShadow="2xl"
              p={5}
              mb={10}
              gap={5}
              alignItems="stretch"
            >
              {['Basic', 'Pro', 'Premium'].map((plan) => (
                <Radio key={plan} value={plan} sx={radioStyle}>
                  <Text fontWeight="bold" fontSize="lg">
                    {plan}
                  </Text>
                </Radio>
              ))}
            </Flex>
          </RadioGroup>
        </form>
      </Box>
    </Container>
  );  
}

export default UserPlan
