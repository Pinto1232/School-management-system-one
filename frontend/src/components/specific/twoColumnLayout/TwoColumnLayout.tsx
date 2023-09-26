import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const TwoColumnLayout = ({ children, isMenuOpen }) => {
  const containerBackground = useColorModeValue("#319795", "#3182ce");
  const marginLeft = isMenuOpen ? '320px' : '0'; // Assuming 320px is the width of your sidebar


  return (
    <Box marginLeft={marginLeft}  mb={5} p={1} transition="margin-left 0.3s ease-in-out" maxWidth="full" bg={containerBackground}>
      {children}
    </Box>
  );
};

export default TwoColumnLayout;
