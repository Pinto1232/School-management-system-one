import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const TwoColumnLayout = ({ children, isMenuOpen }) => {
  const containerBackground = useColorModeValue("", "");
  const marginLeft = isMenuOpen ? '320px' : '0'; 


  return (
    <Box marginLeft={marginLeft}  mb={5} p={1} transition="margin-left 0.3s ease-in-out" maxH="full" maxWidth="full" bg={containerBackground}>
      {children}
    </Box>
  );
};

export default TwoColumnLayout;