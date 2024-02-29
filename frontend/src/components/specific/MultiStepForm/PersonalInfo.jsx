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

const PersonalInfo = ({ nextStep }) => {
  const bgColor = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box bg={bgColor} p={8} borderRadius="lg" boxShadow="md" mt={12}>
      <Heading as="h3" size="lg" textAlign="start" color={textColor} mb={16}>
        Tell us more about the property
      </Heading>
      <Heading as="h6" size="sm" textAlign="start" color={textColor} mt={-10}>
        Address details
      </Heading>
      <VStack spacing={4}></VStack>
    </Box>
  );
};

export default PersonalInfo;
