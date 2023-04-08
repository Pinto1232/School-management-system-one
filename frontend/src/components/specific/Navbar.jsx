import React from 'react';
import { useContext } from 'react';
import { Box, Flex, VStack, Spacer, Link, IconButton, Text, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import UserContext from '../../contexts/UserContext';
import SearchBar from './SearchBar';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn } = useContext(UserContext);

  const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
  const alignItems = useBreakpointValue({ base: 'center', md: 'flex-start' });

  const textColor = useColorModeValue('black', 'white');
  const backgroundColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box
      bg={backgroundColor}
      p={4}
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="sm"
    >
      <Flex direction={flexDirection} alignItems={alignItems}>
        {!isLoggedIn && (
          <Link as={RouterLink} to="/" ml={10} mr={8} style={{ textDecoration: 'none' }}>
            <Text color={textColor}>Home</Text>
          </Link>
        )}

        {!isLoggedIn && (
          <Link as={RouterLink} to="/about" mr={8} style={{ textDecoration: 'none' }}>
            <Text color={textColor}>About</Text>
          </Link>
        )}

        {!isLoggedIn && (
          <Link as={RouterLink} to="/faq" mr={8} style={{ textDecoration: 'none' }}>
            <Text color={textColor}>FAQs</Text>
          </Link>
        )}
        <Spacer />
        <Flex alignItems={alignItems} spacing={0}>
          {/* Seachbar */}
          <SearchBar />
          {/* Sign Up */}
          {!isLoggedIn && (
            <Link as={RouterLink} to="/register" ml={4} style={{ textDecoration: 'none' }}>
              <Text color={textColor} mr={4} whiteSpace="nowrap">
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
