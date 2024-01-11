import React, { useState, useRef, useEffect, useContext } from "react";
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
import { css } from "@emotion/react";
import UserProfileInfo from "./UserProfileInfo";
import { CloseButton } from "@chakra-ui/react";
import { useUserContext } from '../../contexts/UserContext';
import NextExamStart from "../../components/common/NextExamStart";


const thinScrollbar = css`
  &::-webkit-scrollbar {
    width: 8px; 
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 255); 
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2); 
    border-radius: 8px; 
    cursor: pointer; 
  }
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3); 
  }
`;


const UserMenu = ({ onMenuToggle, gap }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const iconsColor = useColorModeValue("#319795", "#3182ce");
  const btColor = useColorModeValue("#319795", "#3182ce");
  const textColor = useColorModeValue("#000", "#fff");
  const bgMenuColor = useColorModeValue("#171923", "#171923");
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { logout } = useUserContext();
  const examDate = new Date('2024-05-30T15:00:00Z');



  /*  console.log("User Image", user); */


  const handleLogout = async () => {
    setIsLoading(true);

    // Simulate an asynchronous action (like a server request)
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Invoke the logout function from UserContext
    logout();
    // Display a toast notification
    toast({
      title: "You have logged out!",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });

    // Redirect to the home page
    navigate('/');
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
        <DrawerOverlay >
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <Flex justifyContent="space-between" alignItems="center">
                <UserProfileInfo
                  /* avatarSrc={user.image} */
                  user={user}
                  imageWidth="60px"
                  imageHeight="60px"
                />
                <CloseButton
                  onClick={() => {
                    onClose();
                    onMenuToggle(false);
                  }}
                  bg="#3182ce"
                  color="white"
                  borderRadius="full"
                />
              </Flex>
            </DrawerHeader>
            <DrawerBody css={thinScrollbar}>
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
                <NextExamStart
                  title="Next Exam Starts"
                  examDate={new Date('2024-05-30T15:00:00Z')}
                />

                <Button
                  bg={btColor}
                  color={textColor}
                  isLoading={isLoading}
                  onClick={handleLogout}
                  leftIcon={<IoLogOut />}
                >
                  Logout
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default UserMenu;