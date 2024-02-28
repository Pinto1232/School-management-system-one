import { FormControl, FormLabel, Input, Button, VStack, useColorModeValue, Box } from '@chakra-ui/react';

const LessonPlanForm = () => {
  const inputBg = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");

  return (
    <VStack as="form" spacing={6} align="stretch" p={5} boxShadow="md" borderRadius="lg" bg={useColorModeValue('white', 'gray.2+00')}>
      <Box >
        <FormControl >
          <FormLabel htmlFor="objectives" color={textColor}>Objectives:</FormLabel>
          <Input id="objectives" name="objectives" placeholder="Enter objectives" bg={inputBg} borderColor="transparent" _hover={{ borderColor: "teal.500" }} _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }} color={textColor} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="activities" color={textColor}>Activities:</FormLabel>
          <Input id="activities" name="activities" placeholder="Describe activities" bg={inputBg} borderColor="transparent" _hover={{ borderColor: "teal.500" }} _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }} color={textColor} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="materials" color={textColor}>Materials:</FormLabel>
          <Input id="materials" name="materials" placeholder="List materials" bg={inputBg} borderColor="transparent" _hover={{ borderColor: "teal.500" }} _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }} color={textColor} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="assessment" color={textColor}>Assessment Methods:</FormLabel>
          <Input id="assessment" name="assessment" placeholder="Define assessment methods" bg={inputBg} borderColor="transparent" _hover={{ borderColor: "teal.500" }} _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }} color={textColor} />
        </FormControl>
      </Box>
      <Button type="submit" colorScheme="teal" size="lg" fontSize="md">Submit</Button>
    </VStack>
  );
};

export default LessonPlanForm;