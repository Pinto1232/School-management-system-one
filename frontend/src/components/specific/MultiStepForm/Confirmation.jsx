import { Box, VStack, Heading, useColorModeValue } from '@chakra-ui/react'

const Confirmation = ({ prevStep, handleSubmit }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Box bg={bgColor} borderRadius={{ sm: '2xl', md: '2xl', lg: 'sm' }}>
      <Heading as="h3" size="sm" textAlign="start" ml={7} color={textColor}>
        Confirmation
      </Heading>
      <VStack spacing={4}></VStack>
    </Box>
  )
}

export default Confirmation
