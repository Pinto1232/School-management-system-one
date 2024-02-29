import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const PropertyDetails = ({ nextStep, prevStep }) => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box bg={bgColor} p={6} borderRadius="lg" boxShadow="md" mt={12}>
      <Heading as="h3" size="lg" textAlign="start" color={textColor} mb={16}>
        Property Details
      </Heading>
      <VStack spacing={4}>
        <FormControl id="address" isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            bg={"gray.50"}
            borderColor={"gray.200"}
            borderWidth={1}
            placeholder="123 Main St"
            _placeholder={{ opacity: 1, color: textColor }}
          />
        </FormControl>
        <FormControl id="city" isRequired>
          <FormLabel>City</FormLabel>
          <Input
            bg={"gray.50"}
            borderColor={"gray.200"}
            borderWidth={1}
            placeholder="Anytown"
            _placeholder={{ opacity: 1, color: textColor }}
          />
        </FormControl>
      </VStack>
    </Box>
  );
};

export default PropertyDetails;
