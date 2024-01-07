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
        <Flex justifyContent="space-between" alignItems="center">
          {/* Left-aligned items */}
          <Flex align="center">
            <Menu>
              <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon />} display={{ base: 'block', md: 'none' }} />
              <MenuList>
                {!isLoggedIn && <MenuItem as={RouterLink} to="/">Home</MenuItem>}
                {!isLoggedIn && <MenuItem as={RouterLink} to="/about">About</MenuItem>}
                {!isLoggedIn && <MenuItem as={RouterLink} to="/faq">FAQs</MenuItem>}
              </MenuList>
            </Menu>
            <Flex display={{ base: 'none', md: 'flex' }} ml={4}>
              {!isLoggedIn && <Link as={RouterLink} to="/" textDecoration="none"><Text color={textColor}>Home</Text></Link>}
              {!isLoggedIn && <Link as={RouterLink} to="/about" textDecoration="none" ml={4}><Text color={textColor}>About</Text></Link>}
              {!isLoggedIn && <Link as={RouterLink} to="/faq" textDecoration="none" ml={4}><Text color={textColor}>FAQs</Text></Link>}
            </Flex>
          </Flex>

          {/* Right-aligned items */}
          <Flex align="center">
            {/* SearchBar */}
            <Box flex="1" minW="0">
              <SearchBar />
            </Box>

            {/* Sign Up */}
            {!isLoggedIn && (
              <Link as={RouterLink} to="/register" textDecoration="none" ml={4}>
                <Text color={textColor} whiteSpace="nowrap">Sign Up</Text>
              </Link>
            )}

            {/* Toggle color mode */}
            <IconButton
              fontSize={22}
              color={darkIconBg}
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
              aria-label="Toggle color mode"
              ml={4}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;