import React, { useState, useRef } from "react";
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

const UserMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const iconsColor = useColorModeValue("#319795", "#3182ce");
  const { image, user } = useContext(UserContext);

  console.log(image, user);


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

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <UserProfileInfo
              avatarSrc={user.image}
              user={user}
              imageWidth="60px"
              imageHeight="60px"
            />
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
              <Button
                isLoading={isLoading}
                onClick={handleLogout}
                leftIcon={<IoLogOut />}
              >
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserMenu;
