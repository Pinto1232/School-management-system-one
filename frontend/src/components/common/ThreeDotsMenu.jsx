import React from 'react';
import { Menu, MenuButton, MenuItem, MenuList, Button, Icon, Flex, Box } from '@chakra-ui/react';
import { FaTimes, FaEdit, FaSync } from 'react-icons/fa';

const VerticalDots = () => (
  <Flex flexDirection="column" alignItems="center">
    <Box bg="gray.300" h="4px" w="4px" borderRadius="full" mb="2px"></Box>
    <Box bg="gray.300" h="4px" w="4px" borderRadius="full" mb="2px"></Box>
    <Box bg="gray.300" h="4px" w="4px" borderRadius="full"></Box>
  </Flex>
);

const ThreeDotsMenu = () => {
  return (
    <Box >
      <Menu>
        <MenuButton
          as={Button}
          variant="unstyled"
          _focus={{ outline: 0 }}
        >
          <VerticalDots />
        </MenuButton>
        <MenuList>
          <MenuItem icon={<Icon as={FaTimes} />} onClick={() => console.log('Close clicked')}>
            Close
          </MenuItem>
          <MenuItem icon={<Icon as={FaEdit} />} onClick={() => console.log('Edit clicked')}>
            Edit
          </MenuItem>
          <MenuItem icon={<Icon as={FaSync} />} onClick={() => console.log('Refresh clicked')}>
            Refresh
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ThreeDotsMenu;
