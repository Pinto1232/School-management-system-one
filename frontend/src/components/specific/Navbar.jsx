import React, { useState, useContext } from 'react';
import {
  Box,
  Flex,
  Link,
  IconButton,
  Text,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import UserContext from '../../contexts/UserContext';
import SearchBar from './SearchBar';


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn } = useContext(UserContext);

  const textColor = useColorModeValue('#4A5568', '#fff');
  const backgroundColor = useColorModeValue('#F7FAFC', 'gray.700');


  return (
    <Box
      bg={backgroundColor}
      p={4}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
    >
      <Flex wrap="wrap" justifyContent="space-between" alignItems="center">
        <Menu>
          <MenuButton
            display={{ base: 'block', md: 'none' }}
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
          />
          <MenuList>
            {!isLoggedIn && (
              <MenuItem as={RouterLink} to="/">
                Home
              </MenuItem>
            )}
            {!isLoggedIn && (
              <MenuItem as={RouterLink} to="/about">
                About
              </MenuItem>
            )}
            {!isLoggedIn && (
              <MenuItem as={RouterLink} to="/faq">
                FAQs
              </MenuItem>
            )}
          </MenuList>
        </Menu>

        <Flex
          display={{ base: 'none', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
          width="auto"
          ml={4}
        >
          {!isLoggedIn && (
            <Link
              as={RouterLink}
              to="/"
              ml={10}
              mr={8}
              style={{ textDecoration: 'none' }}
            >
              <Text color={textColor}>Home</Text>
            </Link>
          )}

          {!isLoggedIn && (
            <Link
              as={RouterLink}
              to="/about"
              mr={8}
              style={{ textDecoration: 'none' }}
            >
              <Text color={textColor}>About</Text>
            </Link>
          )}

          {!isLoggedIn && (
            <Link
              as={RouterLink}
              to="/faq"
              mr={8}
              style={{ textDecoration: 'none' }}
            >
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
                <Link
                  as={RouterLink}
                  to="/register"
                  ml={4}
                  style={{ textDecoration: 'none' }}
                >
                  <Text color={textColor} ml={4} whiteSpace="nowrap" marginTop={-4}>
                    Sign Up
                  </Text>
                </Link>
              )}
            </Box>
            {/* Toggle color mode */}
            <Box>
              <IconButton
                onClick={toggleColorMode}
                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                aria-label="Toggle color mode"
                mr={10}
                ml={4}
              />
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
