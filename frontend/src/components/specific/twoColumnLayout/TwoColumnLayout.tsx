import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

const TwoColumnLayout = ({ children, isMenuOpen, isFullWidth = true }) => {
  const containerBackground = useColorModeValue("", "");
  const marginLeft = isMenuOpen ? '320px' : '0';
  const width = isFullWidth ? '100%' : 'auto'; // Default to 'auto' if not full width

  return (
    <Box
      marginLeft={marginLeft}
      mb={5}
      p={1}
      transition="margin-left 0.3s ease-in-out"
      maxH="full"
      maxWidth="full"
      width={width} // Apply conditional width
      bg={containerBackground}
    >
      {children}
    </Box>
  );
};

export default TwoColumnLayout;