import React, { useRef, useContext, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { Link, useToast } from '@chakra-ui/react';
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
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaChalkboardTeacher, FaSchool, FaTasks, FaUserClock, FaFileAlt, FaCalendarAlt, FaBookOpen, FaComments, FaBook, FaCalendar, FaGraduationCap, FaUnlockAlt } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';



const Dashboard = () => {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();


  /* console.log('User from context:', user); */

  const handleLogout = async () => {
    setIsLoading(true);

    // Wait for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Show a toast message
    toast({
      title: 'You are logging out!',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });

    // Implement your logout logic here
    setUser(null);
    navigate('/');
  };

  const menuItems = [
    { label: 'Student Management', path: '/student-management', icon: FaUsers },
    { label: 'Teacher Management', path: '/teacher-management', icon: FaChalkboardTeacher },
    { label: 'Class Management', path: '/class-management', icon: FaSchool },
    { label: 'Attendance Tracking', path: '/attendance-tracking', icon: FaUserClock },
    { label: 'Grading and Assessment', path: '/grading-assessment', icon: FaFileAlt },
    { label: 'Timetable Management', path: '/timetable-management', icon: FaCalendarAlt },
    { label: 'Lesson Planning', path: '/lesson-planning', icon: FaBookOpen },
    { label: 'Parent Communication', path: '/parent-communication', icon: FaComments },
    { label: 'Library Management', path: '/library-management', icon: FaBook },
    { label: 'School Calendar', path: '/school-calendar', icon: FaCalendar },
    { label: 'Online Learning Integration', path: '/online-learning', icon: FaGraduationCap },
    { label: 'Events', path: '/events', icon: FaCalendarAlt },
    { label: 'Task', path: '/tasks', icon: FaTasks },
    { label: 'User Permissions and Roles', path: '/user-permissions-roles', icon: FaUnlockAlt },
  ];


  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

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
          <DrawerHeader borderBottomWidth="1px">Dashboard Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {menuItems.map((item) => (
                <Flex
                  key={item.label}
                  fontSize="lg"
                  onClick={() => handleNavigation(item.path)}
                  alignItems="center"
                >
                  <Box as="span" display="inline-flex" alignItems="center" spacing="12" gap={4}>
                    <item.icon boxSize="6" />
                    <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
                      <span>{item.label}</span>
                    </Link>
                  </Box>
                </Flex>
              ))}
              {/* Add the Log out button */}
              <Button colorScheme="red" onClick={handleLogout} isLoading={isLoading} leftIcon={<IoLogOut />} alignItems="center">
                Log out
              </Button>

            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Dashboard;
