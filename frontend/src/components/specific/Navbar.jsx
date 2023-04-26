import { Box, Flex, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import Navibar from "./NavigationBar/Navibar";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const isLoggedIn = false; // replace with your authentication logic

  const darkIconBg = useColorModeValue('#319795', 'black.300');
 
  return (
    <Box>
      <Flex>
        <Navibar />
      </Flex>
      <Box bg={backgroundColor} p={4} position="sticky" top={0} zIndex={1000} boxShadow="sm">
        <Flex position="sticky" justifyContent="space-between" alignItems="center">
          <Menu>
            <MenuButton display={{ base: 'block', md: 'none' }} as={IconButton} aria-label="Options" icon={<HamburgerIcon />} />
            <MenuList>
              {!isLoggedIn && (
                <MenuItem as={RouterLink} to="/">Home</MenuItem>
              )}
              {!isLoggedIn && (
                <MenuItem as={RouterLink} to="/about">About</MenuItem>
              )}
              {!isLoggedIn && (
                <MenuItem as={RouterLink} to="/faq">FAQs</MenuItem>
              )}
            </MenuList>
          </Menu>

          <Flex display={{ base: 'none', md: 'flex' }} alignItems="center" justifyContent="space-between" width="auto" ml={4}>
            {!isLoggedIn && (
              <Link as={RouterLink} to="/" ml={10} mr={8} textDecoration="none">
                <Text color={textColor}>Home</Text>
              </Link>
            )}

            {!isLoggedIn && (
              <Link as={RouterLink} to="/about" mr={8} textDecoration="none">
                <Text color={textColor}>About</Text>
              </Link>
            )}

            {!isLoggedIn && (
              <Link as={RouterLink} to="/faq" mr={8} textDecoration="none">
                <Text color={textColor}>FAQs</Text>
              </Link>
            )}
          </Flex>

          <Flex alignItems="center">
            {/* SearchBar and Sign Up */}
            <Flex>
              {/* Searchbar */}
              <Box>
                <SearchBar />
              </Box>

              {/* Sign Up */}
              <Box>
                {!isLoggedIn && (
                  <Link as={RouterLink} to="/register" ml={4} textDecoration="none">
                    <Text color={textColor} ml={4} whiteSpace="nowrap" marginTop={-4}>Sign Up</Text>
                  </Link>
                )}
              </Box>
              {/* Toggle color mode */}
              <Box>
                <IconButton fontSize={22} color={darkIconBg} onClick={toggleColorMode} icon={colorMode === 'light' ? <SunIcon/> : <MoonIcon />} aria-label="Toggle color mode" mr={10} ml={4} />
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
