import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Badge,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Flex,
  SimpleGrid,
  Icon,
} from '@chakra-ui/react';
import { MdFileUpload } from 'react-icons/md';

const AssignmentCard = ({ assignment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission logic here
    console.log('Assignment submitted');
    onClose(); // Close the modal after submission
  };

  const [selectedFileName, setSelectedFileName] = React.useState('');

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedFileName(files[0].name);
    } else {
      setSelectedFileName('');
    }
  };

  return (
    <SimpleGrid align="stretch" p={5} bg={cardBg} boxShadow="md" borderRadius="lg" mb={4}>
      <HStack justifyContent="space-between">
        <Heading size="md" fontWeight="bold">
          {assignment.name}
        </Heading>
        <Badge colorScheme={assignment.isSubmitted ? 'green' : 'red'}>
          {assignment.isSubmitted ? 'Submitted' : 'Pending'}
        </Badge>
      </HStack>
      <Text fontSize="sm" color={textColor}>
        Due: {assignment.dueDate}
      </Text>
      <Text fontSize="sm" color={textColor} noOfLines={2}>
        {assignment.description}
      </Text>
      <Button colorScheme="blue" size="sm" onClick={onOpen}>
        Submit Assignment
      </Button>

      {/* Modal for assignment submission */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent borderRadius="xl" mx={4} bg={useColorModeValue('white', 'gray.800')} boxShadow="2xl">
          <ModalHeader borderBottomWidth="1px" fontWeight="bold" fontSize="lg" bg={useColorModeValue('blue.500', 'blue.600')} color="white">
            Submit Assignment
          </ModalHeader>
          <ModalCloseButton size="lg" />
          <form onSubmit={handleSubmit}>
            <ModalBody py={6}>
              <FormControl isRequired>
                <FormLabel htmlFor="file" fontWeight="semibold" fontSize="md" display="flex" alignItems="center" cursor="pointer">
                  <Icon as={MdFileUpload} mr={2} />
                  Upload File
                  <Input type="file" id="file" name="file" p={2} opacity={0} position="absolute" width="1px" height="1px" overflow="hidden" zIndex="-1" />
                </FormLabel>
                <Button as="label" htmlFor="file" colorScheme="blue" leftIcon={<MdFileUpload />} mt={2}>
                  Choose File
                </Button>
                <Text fontSize="sm" mt={2}>
                  {selectedFileName || 'No file chosen'}
                </Text>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel htmlFor="comments" fontWeight="semibold" fontSize="md">Additional Comments</FormLabel>
                <Textarea id="comments" name="comments" borderColor={useColorModeValue('gray.300', 'gray.600')} />
              </FormControl>
            </ModalBody>
            <ModalFooter borderTopWidth="1px">
              <Button colorScheme="blue" type="submit" size="lg" fontSize="md" fontWeight="bold" boxShadow="md">
                Submit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
};

const AssignmentManagement = ({ assignmentData }) => {
  return (
    ({ assignmentData }) => {
      return (
         <Box p={5}>
           <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={2} >
             {assignmentData.map((assignment) => (
               <AssignmentCard key={assignment.id} assignment={assignment} />
             ))}
           </SimpleGrid>
         </Box>
      );
     }
  );
};

export default AssignmentManagement;