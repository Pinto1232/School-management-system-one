import React, { useRef, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Grid, Link, useToast } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaSchool,
  FaTasks,
  FaUserClock,
  FaFileAlt,
  FaCalendarAlt,
  FaBookOpen,
  FaComments,
  FaBook,
  FaCalendar,
  FaGraduationCap,
  FaUnlockAlt,
} from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import AdjustableColumnLayout from "../components/specific/twocolumns/AdjustableColumnLayout";
import UserProfile from "../components/common/UserProfilePage";
import Avatars from "../assets/images/logo.png";
import ProductSorting from "../components/specific/ProductSorting";
import ProductSortingOptionsData from "../data/ProductSortingOptionsData";
import Breadcrumbs from "../components/specific/Breadcrumbs";
import BreadcumberData from "../data/BreadcumberData";
import BlogPost from "../components/common/BlogPost";
import blogPostsData from "../data/blogPostsData";
import TableWithIcons from "../components/specific/tableImage/TableWithIcons";
import productsImagesData from "../data/productsImagesData";
import CardCustom from "../components/common/CardCustom";
import cardCustomData from "../data/cardCustomData";

const Dashboard = () => {
  const bgDashboard = useColorModeValue("gray.50", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const textColor = useColorModeValue("#4A5568", "#fff");
  const backgroundColor = useColorModeValue("#fff", "gray.700");
  const backgroundBorder = useColorModeValue("", "1px solid");

  /* console.log('User from context:', user); */

  const handleLogout = async () => {
    setIsLoading(true);

    // Wait for 3 seconds
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Show a toast message
    toast({
      title: "You are logging out!",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    // Implement your logout logic here
    setUser(null);
    navigate("/");
  };

  const menuItems = [
    { label: "Student Management", path: "/student-management", icon: FaUsers },
    {
      label: "Teacher Management",
      path: "/teacher-management",
      icon: FaChalkboardTeacher,
    },
    { label: "Class Management", path: "/class-management", icon: FaSchool },
    {
      label: "Attendance Tracking",
      path: "/attendance-tracking",
      icon: FaUserClock,
    },
    {
      label: "Grading and Assessment",
      path: "/grading-assessment",
      icon: FaFileAlt,
    },
    {
      label: "Timetable Management",
      path: "/timetable-management",
      icon: FaCalendarAlt,
    },
    { label: "Lesson Planning", path: "/lesson-planning", icon: FaBookOpen },
    {
      label: "Parent Communication",
      path: "/parent-communication",
      icon: FaComments,
    },
    { label: "Library Management", path: "/library-management", icon: FaBook },
    { label: "School Calendar", path: "/school-calendar", icon: FaCalendar },
    {
      label: "Online Learning Integration",
      path: "/online-learning",
      icon: FaGraduationCap,
    },
    { label: "Events", path: "/events", icon: FaCalendarAlt },
    { label: "Task", path: "/tasks", icon: FaTasks },
    {
      label: "User Permissions and Roles",
      path: "/user-permissions-roles",
      icon: FaUnlockAlt,
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  // Product sorting
  const [selectedOption, setSelectedOption] = useState("price-low-to-high");

  const handleSortingChange = (value) => {
    setSelectedOption(value);
    // Do something else, like update the product list with the new sorting option
  };

  return (
    <Box bg={bgDashboard} minH="100vh">
      <Flex direction="column" maxW="8xl" mx="auto" p={4}>
        <Flex justify="space-between" align="center" mb={4}>
          <Heading>
            {/* <Text fontSize="3xl">PintoEdu Management</Text> */}
            <Flex
              justify={"center"}
              alignItems={"center"}
              whiteSpace={"nowrap"}
            >
              <UserProfile
                ImageHeight={"20%"}
                imageWidth={"20%"}
                avatarSrc="https://cdn-icons-png.flaticon.com/512/147/147140.png"
              />
              {user && (
                <Text fontSize="2xl" marginTop={10} fontWeight="bold">
                  Welcome, {user.name}
                </Text>
              )}
            </Flex>
          </Heading>
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            icon={<HamburgerIcon />}
            variant="outline"
          />
        </Flex>
        <Text color={textColor} fontSize="3xl" fontWeight={"bold"}>
          Dashboard
        </Text>
        <Box bg={backgroundColor} color={textColor}>
          <Breadcrumbs
            items={BreadcumberData}
            bgColor={"gray.50"}
            BreadcPadding={2}
          />
        </Box>
        <VStack spacing={4} align="stretch">
          <Flex
            border={backgroundBorder}
            bg={backgroundColor}
            boxShadow="base"
            p={6}
            borderRadius="md"
            display="flex"
          >
            <AdjustableColumnLayout>
              <Flex gap={4}>
                {/* Sorting by component */}
                <Grid>
                  <ProductSorting
                    options={ProductSortingOptionsData}
                    selectedOption={selectedOption}
                    onChange={handleSortingChange}
                  />
                </Grid>
                {/* End of sorting by */}

                <Grid>
                  {/* Custom card */}
                  <CardCustom
                    data={cardCustomData}
                    paragraphWidth="200px"
                    rows={5}
                    columns={1}
                  />
                  {/* End of custom card */}
                </Grid>
              </Flex>
            </AdjustableColumnLayout>
          </Flex>

          {/* Box of table */}
          <Grid
            border={backgroundBorder}
            bg={backgroundColor}
            boxShadow="base"
            borderRadius="md"
          >
            <Text mx={6} color={textColor} fontSize="xl">
              Students
            </Text>
            {/* Add content here */}
            <AdjustableColumnLayout>
              <Box
                maxW="4xl"
                textAlign={"center"}
                mx="auto"
                p={6}
                borderWidth={0}
                rounded="md"
                border={2}
              >
                <TableWithIcons
                  productsImages={productsImagesData}
                  ThBgColor={"gray.800"}
                  ThColor={"#fff"}
                  borderWid={1}
                  tbShadow={"lg"}
                />
              </Box>

              <Box
                maxW="4xl"
                textAlign={"center"}
                mx="auto"
                p={6}
                borderWidth={0}
                rounded="md"
                border={2}
              >
                <TableWithIcons
                  productsImages={productsImagesData}
                  ThBgColor={"gray.800"}
                  ThColor={"#fff"}
                  borderWid={1}
                  tbShadow={"lg"}
                />
              </Box>
            </AdjustableColumnLayout>
          </Grid>
          {/* End of the table */}

          <Box
            border={backgroundBorder}
            bg={backgroundColor}
            boxShadow="base"
            p={6}
            borderRadius="md"
          >
            <Text color={textColor} fontSize="xl">
              Tasks
            </Text>
            {/* Add content here */}
          </Box>
          <Box
            border={backgroundBorder}
            bg={backgroundColor}
            boxShadow="base"
            p={6}
            borderRadius="md"
          >
            <Text color={textColor} fontSize="xl">
              Tasks
            </Text>
            {/* Add content here */}
          </Box>
          <Box
            border={backgroundBorder}
            bg={backgroundColor}
            boxShadow="base"
            p={6}
            borderRadius="md"
          >
            <Text color={textColor} fontSize="xl">
              Tasks
            </Text>
            {/* Add content here */}
          </Box>
        </VStack>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Dashboard Menu</DrawerHeader>
          <DrawerBody>
            <VStack spac ing={4} align="stretch">
              {menuItems.map((item) => (
                <Flex
                  key={item.label}
                  fontSize="lg"
                  onClick={() => handleNavigation(item.path)}
                  alignItems="center"
                >
                  <Box
                    as="span"
                    display="inline-flex"
                    alignItems="center"
                    spacing="12"
                    gap={4}
                  >
                    <item.icon boxSize="6" />
                    <Link
                      textDecoration="none"
                      hover={{
                        textDecoration: "none",
                        backgroundColor: "gray.100",
                        paddingTop: "1",
                        paddingBottom: "1",
                        paddingLeft: "2",
                        paddingRight: "4",
                        transition: "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
                        width: "230px",
                        whiteSpace: "nowrap",
                        borderRadius: "8",
                      }}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </Box>
                </Flex>
              ))}
              {/* Add the Log out button */}
              <Button
                colorScheme="red"
                onClick={handleLogout}
                isLoading={isLoading}
                leftIcon={<IoLogOut />}
                alignItems="center"
              >
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
