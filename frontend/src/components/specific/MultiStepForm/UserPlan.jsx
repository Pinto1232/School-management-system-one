import {
  Box,
  VStack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react'

const PricingOptions = ({ prevStep, handleSubmit }) => {
  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Box bg={bgColor} borderRadius={{ sm: '2xl', md: '2xl', lg: 'sm' }}>
      <Heading as="h3" size="sm" textAlign="start" ml={7} color={textColor}>
        Your Plan
      </Heading>
      <VStack spacing={4}>
        {/* <FormControl id="price" isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            placeholder="100"
            _placeholder={{ opacity: 1, color: textColor }}
          />
        </FormControl> */}
      </VStack>
    </Box>
  )
}

export default PricingOptions
