import React from 'react';
import { Box, Flex, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import Navibar from "./NavigationBar/Navibar";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const backgroundColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "white");
  const isLoggedIn = false; 
  const location = useLocation(); 
  const onDashboard = location.pathname === '/dashboard'; 
  const darkIconBg = useColorModeValue('#319795', 'black.300');

  return (
    <Box>
      <Flex>
        <Navibar />
      </Flex>
      <Box bg={backgroundColor} p={4} position="sticky" top={0} zIndex={1000} boxShadow="sm">
        <Flex justifyContent="space-between" alignItems="center">
          {/* Toggle color mode IconButton on the left if on the dashboard */}
          {onDashboard && (
            <IconButton
              fontSize={22}
              color={darkIconBg}
              onClick={toggleColorMode}
              icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
              aria-label="Toggle color mode"
            />
          )}

          {/* Left-aligned items, hidden on the dashboard */}
          {!onDashboard && (
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
          )}

          {/* Right-aligned items */}
          <Flex align="center" flex="1" justifyContent={onDashboard ? "flex-end" : "space-between"}>
            {/* SearchBar */}
            <Box minWidth="0" flexGrow={1}>
              <SearchBar />
            </Box>

            {/* Sign Up, hidden on the dashboard */}
            {!isLoggedIn && !onDashboard && (
              <Link as={RouterLink} to="/register" textDecoration="none" ml={4}>
                <Text color={textColor} whiteSpace="nowrap">Sign Up</Text>
              </Link>
            )}

            {/* Toggle color mode IconButton on the right if not on the dashboard */}
            {!onDashboard && (
              <IconButton
                fontSize={22}
                color={darkIconBg}
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                aria-label="Toggle color mode"
                ml={4}
              />
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default Navbar;