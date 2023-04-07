import React from 'react';
import { useContext } from 'react';
import { Box, Flex, Spacer, Link, IconButton, Text } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import UserContext from '../../contexts/UserContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} p={4}>
      <Flex alignItems="center">
        {!isLoggedIn && (
          <Link as={RouterLink} to="/" ml={10} mr={8} style={{ textDecoration: 'none' }}>
            <Text>Home</Text>
          </Link>
        )}

        {!isLoggedIn && (
          <Link as={RouterLink} to="/" mr={8} style={{ textDecoration: 'none' }}>
            <Text>About</Text>
          </Link>
        )}

        {!isLoggedIn && (
          <Link as={RouterLink} to="/" mr={8} style={{ textDecoration: 'none' }}>
            <Text>FAQs</Text>
          </Link>
        )}
        <Spacer />
        <Flex alignItems="flex-start" spacing={0}>
          {/* Seachbar */}
          <SearchBar />
          {/* Sign Up */}
          {!isLoggedIn && (
            <Link as={RouterLink} to="/register"  ml={4} style={{ textDecoration: 'none' }}>
              <Text mr={4} whiteSpace="nowrap">
                Sign Up
              </Text>
            </Link>
          )}

          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle color mode"
            mr={10}
          />
        </Flex>

      </Flex>
    </Box>
  );
};

export default Navbar;
