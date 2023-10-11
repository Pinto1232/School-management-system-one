import React, { useState, useRef, useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  VStack,
  Flex,
  Box,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import menuItemsData from "../../data/menuItemsData";
import { useColorModeValue } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";
import { css } from "@emotion/react";
import UserProfileInfo from "./UserProfileInfo";
import { useBreakpointValue } from "@chakra-ui/react";

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

const UserMenu = ({ onButtonClick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { isLoggedIn, setIsLoggedIn, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const iconsColor = useColorModeValue("#319795", "#3182ce");
  const { image, user } = useContext(UserContext);
  const size = useBreakpointValue({ base: "full", md: "md", lg: "lg" });

  const dashboardBG = useColorModeValue("#e6ebee", "#e6ebee");

  // In your component
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

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
    setIsLoggedIn(false); // Set isLoggedIn to false when user logs out
  };

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };


  const handleMenuToggle = () => {
    if (isOpen) {
      onClose();
      onMenuToggle(false); // Setting menu to close
    } else {
      onOpen();
      onMenuToggle(true);  // Setting menu to open
    }
  };

  const handleOverlayClick = (e) => {
    e.stopPropagation();
  };
  
  

  return (
    <>
      
      <Box position="absolute" right="0" shadow="md" borderRadius="md" m={4}>
        <Tooltip label="Open Sidebar" fontSize="xs">
          <IconButton
            ref={btnRef}
            onClick={handleMenuToggle}
            icon={<HamburgerIcon />}
            variant="outline"
          />
        </Tooltip>
      </Box>
      <Drawer
        placement="left"
        finalFocusRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        isCloseable={false}
        size="xs"
        closeOnOverlayClick={false} // Add this
        trapFocus={false} // Add this
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Flex gap={"20"}>
              <UserProfileInfo
                avatarSrc={user.image}
                user={user}
                imageWidth="70px"
                imageHeight="70px"
                bgImageNoRepeat={"no-repeat"}
                bgImagePosition={"center"}
              />
              <IconButton
                icon={<CloseIcon />}
                onClick={onClose}
                zIndex={"999"}
                bg="teal.500"
                variant="solid"
                color="white"
                _hover={{ color: "gray.900", bg: { dashboardBG } }}
              />
            </Flex>
          </DrawerHeader>
          <DrawerBody css={thinScrollbar}>
            <Flex direction="column" justify="space-between" height="100%">
              <VStack spacing={4} align="stretch">
                {menuItemsData?.map((item) => (
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
                            "all 0.50s cubic-bezier(0.25, 0.1, 0.25, 1)",
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
              </VStack>
              <Button
                bg={btColor}
                color={textColor}
                isLoading={isLoading}
                onClick={handleLogout}
                leftIcon={<IoLogOut />}
              >
                Logout
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserMenu;
