import React from 'react';
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

const EmailBadge = ({ 
  email, 
  width = "auto", 
  height = "auto", 
  bgColor = "blue", 
  textColor = "white",
  iconWidth = "12px",  // Added new prop for icon width
  iconHeight = "12px"  // Added new prop for icon height
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
    >
      <TagLeftIcon boxSize={iconWidth} height={iconHeight} as={EmailIcon} />  {/* Updated boxSize and added height */}
      <TagLabel>{email}</TagLabel>
    </Tag>
  );
};

export default EmailBadge;
