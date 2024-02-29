import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";

const PricingOptions = ({ prevStep, handleSubmit }) => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="2xl" mt={12}>
      <Heading as="h3" size="lg" textAlign="start" color={textColor} mb={16}>
        Pricing Options
      </Heading>
      <VStack spacing={4}>
        <FormControl id="price" isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type="number"
            placeholder="100"
            _placeholder={{ opacity: 1, color: textColor }}
          />
        </FormControl>
        <FormControl id="currency" isRequired>
          <FormLabel>Currency</FormLabel>
          <Select placeholder="Select currency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </Select>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default PricingOptions;
