import React, { useState } from 'react';
import { Box, Text, Menu, MenuButton, Button, MenuList, MenuItem, useColorModePreference } from '@chakra-ui/react';
import { FaGlobe } from 'react-icons/fa'; // Using react-icons for demonstration

const GlobeBadge = ({
  count,
  width = "40px",
  height = "40px",
  bgColor = "transparent",
  textColor = "white",
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const gobleIconBgColor = useColorModePreference("#fff", "#3182ce");

  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Menu>
        <MenuButton as={Button} bg={gobleIconBgColor}>
          <Box
            width={width}
            height={height}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            bgColor={gobleIconBgColor}
            color={gobleIconBgColor}
          >
            <FaGlobe />
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setSelectedLanguage('English')}>English</MenuItem>
          <MenuItem onClick={() => setSelectedLanguage('Spanish')}>Spanish</MenuItem>
          <MenuItem onClick={() => setSelectedLanguage('French')}>French</MenuItem>
          <MenuItem onClick={() => setSelectedLanguage('German')}>German</MenuItem>
        </MenuList>
      </Menu>

      {count > 0 && (
        <Box
          position="absolute"
          top="0"
          right="0"
          bg="red.500"
          color="white"
          borderRadius="full"
          width="20px"
          height="20px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="10px"
        >
          <Text>{count}</Text>
        </Box>
      )}
    </Box>
  );
};

export default GlobeBadge;
