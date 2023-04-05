import React from 'react';
import { Box, Flex, Spacer, Button, Link } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  

  return (
    <Box bg={colorMode === 'light' ? 'gray.100' : 'gray.700'} p={4}>
      <Flex>
        <Link as={RouterLink} to="/" mr={4} style={{ textDecoration: 'none' }}>
          Home
        </Link>
     
        <Link as={RouterLink} to="/register" mr={4} style={{ textDecoration: 'none' }}>
          Signup
        </Link>
        <Spacer />
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;