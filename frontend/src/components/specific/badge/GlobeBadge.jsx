import React, { useState } from 'react';
import { Box, Text, Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import { FaGlobe } from 'react-icons/fa'; // Using react-icons for demonstration

const GlobeBadge = ({
  count,
  width = "40px",
  height = "40px",
  bgColor = "transparent",
  textColor = "white",
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  return (
    <Box
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Menu>
        <MenuButton as={Button}>
          <Box
            width={width}
            height={height}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            bgColor={bgColor}
            color={textColor}
          >
            <FaGlobe /> {/* Using FaGlobe icon */}
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
          bg={bgColor}
          color={textColor}
          borderRadius="full"
          width="16px"
          height="16px"
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
