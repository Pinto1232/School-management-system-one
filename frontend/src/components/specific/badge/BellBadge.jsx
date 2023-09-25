import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import BellIcon from './BellIcon'; // Import the BellIcon component

const BellBadge = ({ 
  count,
  width = "40px", 
  height = "40px", 
  bgColor = "blue", 
  textColor = "white" 
}) => {
  return (
    <Box
      position="relative"
      width={width}
      height={height}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius="full"
    >
      <BellIcon /> {/* The bell icon */}
      { count > 0 && (
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

export default BellBadge;
