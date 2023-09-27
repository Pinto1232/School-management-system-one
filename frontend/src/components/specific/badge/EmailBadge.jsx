import React from 'react';
import { Box, Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

const EmailBadge = ({ 
  email, 
  width = "auto", 
  height = "auto", 
  bgColor = "blue", 
  textColor = "white",
  iconWidth = "12px",
  iconHeight = "12px",
  count  // Added new prop for the count
}) => {
  return (
    <Tag 
      size="md" 
      width={width}
      height={height}
      bgColor={bgColor}
      color={textColor}
      variant="subtle" 
      colorScheme="blue"
      justifyContent="center"
      alignItems="center"
      position="relative"  // Added for positioning the count
    >
      {/* Added Box to display the count */}
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
        fontSize="12px"
      >
        {count}
      </Box>
      <TagLeftIcon boxSize={iconWidth} height={iconHeight} as={EmailIcon} />
      <TagLabel>{email}</TagLabel>
    </Tag>
  );
};

export default EmailBadge;
