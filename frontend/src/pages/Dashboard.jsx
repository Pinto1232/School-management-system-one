import React, { useRef, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Text,
  useColorModeValue,
  VStack,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Dashboard = () => {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user } = useContext(UserContext);
  console.log('User from context:', user);



  return (
    <Box bg={bg} minH="100vh">
      <Flex direction="column" maxW="1200px" mx="auto" p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading>
            <Text fontSize="3xl">PintoEdu Management</Text>
            {user && (
              <Text fontSize="2xl" marginTop={10} fontWeight="bold">Welcome, {user.name}</Text>
            )}
          </Heading>
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            icon={<HamburgerIcon />}
            variant="outline"
          />
        </Flex>
        <VStack spacing={4} align="stretch">
          <Box bg="white" boxShadow="base" p={6} borderRadius="md">
            <Text fontSize="xl">Announcements</Text>
            {/* Add content here */}
          </Box>
          <Box bg="white" boxShadow="base" p={6} borderRadius="md">
            <Text fontSize="xl">Events</Text>
            {/* Add content here */}
          </Box>
          <Box bg="white" boxShadow="base" p={6} borderRadius="md">
            <Text fontSize="xl">Tasks</Text>
            {/* Add content here */}
          </Box>
        </VStack>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg">Dashboard</Text>
              <Text fontSize="lg">Announcements</Text>
              <Text fontSize="lg">Events</Text>
              <Text fontSize="lg">Tasks</Text>
              {/* Add more menu items here */}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Dashboard;
