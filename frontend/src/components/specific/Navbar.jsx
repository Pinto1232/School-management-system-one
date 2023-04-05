import React from 'react';
import { Box, Flex, Spacer, Button, Link, IconButton } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();



  return (
    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} p={4}>
      <Flex alignItems="center">
        <Link as={RouterLink} to="/" mr={4} style={{ textDecoration: 'none' }}>
          Home
        </Link>
        <Spacer />
        <Link as={RouterLink} to="/register" mr={4} style={{ textDecoration: 'none' }}>
          Sign Up
        </Link>
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          aria-label="Toggle color mode"
        />
      </Flex>
    </Box>
  );
};

export default Navbar;