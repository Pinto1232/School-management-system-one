import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const TwoColumnLayout = ({ children }) => {
  const containerBackground = useColorModeValue("#319795", "#3182ce");
  return (
    <Box w="100%" maxWidth="full" bg={containerBackground}>
      {children}
    </Box>
  );
};

export default TwoColumnLayout;
