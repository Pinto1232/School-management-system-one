import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, VStack, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useColorModeValue, Flex } from '@chakra-ui/react';
import CurriculumUnit from './CurriculumUnit';
import { AddIcon } from '@chakra-ui/icons';
import LessonPlanForm from './LessonPlanForm';


const CurriculumMap = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [curriculumUnits, setCurriculumUnits] = useState([]);
  const [newUnit, setNewUnit] = useState({ title: '', description: '', standards: '' });

  const handleAddUnit = () => {
    const updatedUnits = [...curriculumUnits, { ...newUnit, id: Date.now() }];
    setCurriculumUnits(updatedUnits);
    localStorage.setItem('curriculumUnits', JSON.stringify(updatedUnits));
    setNewUnit({ title: '', description: '', standards: '' });
    onClose();
  };

  const handleDeleteUnit = (unitId) => {
    const updatedUnits = curriculumUnits.filter(unit => unit.id !== unitId);
    setCurriculumUnits(updatedUnits);

    localStorage.setItem('curriculumUnits', JSON.stringify(updatedUnits));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUnit({ ...newUnit, [name]: value });
  };

  useEffect(() => {
    const savedUnits = localStorage.getItem('curriculumUnits');
    if (savedUnits) {
      setCurriculumUnits(JSON.parse(savedUnits));
    }
  }, []);

  const modalBg = useColorModeValue("gray.200", "gray.800");
  const inputBg = useColorModeValue("gray.300", "gray.200");
  const textColor = useColorModeValue("gray.700", "whiteAlpha.900");

  return (
    <Box p={5}>
      <Heading mb={4} fontSize={'lg'}>Curriculum Mapping</Heading>
      <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onOpen}>
        Add Curriculum Unit
      </Button>

      {/* Modal for adding a new curriculum unit */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent bg={modalBg} borderRadius="lg">
          <ModalHeader bgGradient="linear(to-r, teal.300, blue.500)" borderRadius="lg 0 0 0" color="white">
            Add a New Curriculum Unit
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={newUnit.title} onChange={handleChange} placeholder="Unit Title" bg={inputBg} borderColor="transparent" _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }} color={textColor} />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={newUnit.description} onChange={handleChange} placeholder="Unit Description" bg={inputBg} borderColor="transparent" _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }} color={textColor} />
              </FormControl>
              <FormControl>
                <FormLabel>Standards</FormLabel>
                <Input name="standards" value={newUnit.standards} onChange={handleChange} placeholder="Learning Standards" bg={inputBg} borderColor="transparent" _focus={{ borderColor: "teal.500", boxShadow: "0 0 0 1px teal.500" }} color={textColor} />
              </FormControl>
              <FormControl>
                <LessonPlanForm />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleAddUnit}>
              Add Unit
            </Button>
            <Button variant="outline" colorScheme="teal" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      <VStack spacing={4} mt={4}>
        <div style={{ maxHeight: '500px', overflowY: 'auto', width: '100%' }}>
          <Flex gap={2} wrap={curriculumUnits.length > 5 ? "wrap" : "nowrap"} style={{ justifyContent: curriculumUnits.length <= 5 ? 'flex-start' : 'space-between' }}>
            {curriculumUnits.map((unit) => (
              <CurriculumUnit key={unit.id} unit={unit} onDelete={handleDeleteUnit} />
            ))}
          </Flex>
        </div>
      </VStack>
    </Box>
  );
};

export default CurriculumMap;
