import React, { useRef, useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import { Grid, Link, useToast } from "@chakra-ui/react";
import { css } from "@emotion/react";
import bgImage from "../assets/images/basic.jpg"
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
import { IoLogOut } from "react-icons/io5";
import AdjustableColumnLayout from "../components/specific/twocolumns/AdjustableColumnLayout";
import UserProfile from "../components/common/UserProfilePage";
import ProductSorting from "../components/specific/ProductSorting";
import ProductSortingOptionsData from "../data/ProductSortingOptionsData";
import Breadcrumbs from "../components/specific/Breadcrumbs";
import BreadcumberData from "../data/BreadcumberData";
import TableWithIcons from "../components/specific/tableImage/TableWithIcons";
import productsImagesData from "../data/productsImagesData";
import CardCustom from "../components/common/CardCustom";
import cardCustomData from "../data/cardCustomData";
import menuItemsData from "../data/menuItemsData";
import Jumbotron from "./../components/specific/Jumbotron";

// Define your styles here
const thinScrollbar = css`
  &::-webkit-scrollbar {
    width: 10px;
    borderradius: 2;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

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
  const breadCumberBg = useColorModeValue("", "gray.800");
  const iconsColor = useColorModeValue("#319795", "#3182ce");

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
      <Flex direction="column" maxW={"1290px"} mx="auto" p={4}>
        <Jumbotron
          title="Elevate Education, Simplify School Management!"
          bgImage={bgImage}
          
        />
        <Flex justify="space-between" align="center" mb={4}>
          <Heading>
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
            bgColor={breadCumberBg}
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
                <Grid>
                  <ProductSorting
                    options={ProductSortingOptionsData}
                    selectedOption={selectedOption}
                    onChange={handleSortingChange}
                  />
                </Grid>

                <Grid>
                  <CardCustom
                    data={cardCustomData}
                    paragraphWidth="200px"
                    rows={3}
                    columns={1}
                  />
                </Grid>
              </Flex>
            </AdjustableColumnLayout>
          </Flex>

          <Grid
            border={backgroundBorder}
            bg={backgroundColor}
            boxShadow="base"
            borderRadius="md"
          >
            <Text mx={6} color={textColor} fontSize="xl">
              Students
            </Text>
            <AdjustableColumnLayout>
              <Box
                maxW="4xl"
                textAlign={"center"}
                mx="auto"
                p={4}
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
                p={4}
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
          <DrawerBody css={thinScrollbar}>
            <VStack spacing={4} align="stretch">
              {menuItemsData.map((item) => (
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
                    <item.icon boxsize="0" fontSize={20} color={iconsColor} />
                    <Link
                      textDecoration="none"
                      _hover={{
                        textDecoration: "none",
                        paddingTop: "1",
                        paddingBottom: "1",
                        paddingLeft: "2",
                        paddingRight: "2",
                        transition:
                          "all 0.99s cubic-bezier(0.15, 0.8, 0.10, 6)",
                        width: "230px",
                        whiteSpace: "nowrap",
                        borderRadius: "4",
                      }}
                    >
                      <span>{item.label}</span>
                    </Link>
                  </Box>
                </Flex>
              ))}
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
