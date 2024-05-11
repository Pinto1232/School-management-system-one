import React from 'react';
import { Box, Avatar, Text, Button, VStack, HStack, Link, Icon } from '@chakra-ui/react';
import { FiMail, FiPhone, FiGlobe } from 'react-icons/fi';

function UserProfile() {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
      <VStack spacing={4}>
        <Avatar size="xl" name="Chelsie Haley" src="https://bit.ly/dan-abramov" />
        <Text fontWeight="bold" fontSize="xl">Chelsie Haley</Text>
        <Text color="gray.500">@chelsiehaley</Text>
        <HStack spacing={3}>
          <Button colorScheme="blue" variant="outline">Follow</Button>
          <Button colorScheme="blue">Message</Button>
        </HStack>
        <Box w="100%">
          <Text fontWeight="bold" mb={2}>Contact Information</Text>
          <VStack align="start" spacing={1}>
            <HStack>
              <Icon as={FiMail} />
              <Link href="mailto:fahey.designer@robot.co" isExternal>fahey.designer@robot.co</Link>
            </HStack>
            <HStack>
              <Icon as={FiPhone} />
              <Text>+1234567890</Text>
            </HStack>
            <HStack>
              <Icon as={FiGlobe} />
              <Link href="https://robot.co" isExternal>robot.co</Link>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}

export default UserProfile;
