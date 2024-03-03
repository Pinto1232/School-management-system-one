import {
  Box,
  Heading,
  useColorModeValue,
  useToast,
  RadioGroup,
  Radio,
  Container,
  Flex,
  Text 
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
    boxShadow: 'sm',
    _checked: {
      bg: 'teal.600',
      color: 'white',
      borderColor: 'teal.600',
    },
    _focus: {
      boxShadow: 'outline',
    },
    px: 2,
    py: 2,
  }

  return (
    <Container maxW="container.md" centerContent>
      <Box bg={bgColor} borderRadius={{ sm: '2xl', md: '2xl', lg: 'sm' }}>
        <Heading
          as="h3"
          size="xs"
          textAlign="start"
          mt={10}
          ml={1}
          color={textColor}
        >
          Select Your Plan
        </Heading>
        <form onSubmit={handleSubmit}>
          <RadioGroup onChange={setSelectedPlan} value={selectedPlan}>
            <Flex
              spacing={4}
              mt={5}
              bg={'gray.600'}
              borderRadius={4}
              boxShadow={'2xl'}
              padding={10}
              mb={50}
              gap={4}
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
  )
}

export default UserPlan
