import React, { useState } from 'react';
import { Box, Text, Button, Input, Textarea, VStack, useColorModeValue, Flex, IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

const CurriculumUnit = ({ unit, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUnit, setEditedUnit] = useState({ ...unit });


  const handleEdit = () => setIsEditing(true);

  const handleSave = () => {
    onUpdate(editedUnit);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUnit({ ...unit });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUnit(prev => ({ ...prev, [name]: value }));
  };

  const bg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box w={250} bg={bg} p={5} shadow="md" borderWidth="1px" borderRadius="lg" borderColor={borderColor}>
      {isEditing ? (
        <VStack spacing={4} align="stretch">
          <Input
            name="title"
            value={editedUnit.title}
            onChange={handleChange}
            placeholder="Title"
            variant="filled"
          />
          <Textarea
            name="description"
            value={editedUnit.description}
            onChange={handleChange}
            placeholder="Description"
            variant="filled"
          />
          <Input
            name="standards"
            value={editedUnit.standards}
            onChange={handleChange}
            placeholder="Standards"
            variant="filled"
          />
          <Flex justify="space-between">
            <IconButton icon={<CheckIcon />} onClick={handleSave} colorScheme="green" aria-label="Save" />
            <IconButton icon={<CloseIcon />} onClick={handleCancel} colorScheme="red" aria-label="Cancel" />
          </Flex>
        </VStack>
      ) : (
        <>
          <Text fontSize="xl" fontWeight="bold" mb={2}>{unit.title}</Text>
          <Text mb={2}>{unit.description}</Text>
          <Text mb={4}>Standards: {unit.standards}</Text>
          <Flex justify="space-between">
            <IconButton icon={<EditIcon />} onClick={handleEdit} colorScheme="blue" aria-label="Edit" />
            <IconButton icon={<DeleteIcon />} onClick={() => onDelete(unit.id)} colorScheme="red" aria-label="Delete" />
          </Flex>
        </>
      )}
    </Box>
  );
};

export default CurriculumUnit;