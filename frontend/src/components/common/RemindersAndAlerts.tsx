import React from 'react';
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  useColorModeValue,
  Badge,
  VStack,
  IconButton
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

const RemindersAndAlerts = ({ reminders }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');
  const alertColor = useColorModeValue('red.500', 'red.300');

  return (
    <Box p={5} bg={bgColor} borderRadius="lg" boxShadow="md" width="100%">
      <Heading as="h4" size="md" mb={4} color={textColor} textAlign="start">
        Reminders & Alerts
      </Heading>
      <VStack spacing={4}>
        {reminders.map((reminder, index) => (
          <Box key={index} p={4} bg={bgColor} borderRadius="md" backgroundColor="white" boxShadow="md" width="100%" display="flex" alignItems="center" justifyContent="space-between">
            <Text fontWeight="bold" color={textColor}>
              {reminder.title}
            </Text>
            <Badge colorScheme="red" ml={2}>
              {reminder.dueDate}
            </Badge>
            <IconButton
              aria-label="Alert"
              icon={<BellIcon />}
              color={alertColor}
              onClick={() => alert(reminder.message)}
              variant="ghost"
            />
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default RemindersAndAlerts;