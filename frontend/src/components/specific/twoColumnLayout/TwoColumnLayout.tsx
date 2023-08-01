import React from "react";
import { Box, Flex } from "@chakra-ui/react";

const TwoColumnLayout = ({ children, gap = 4, ...props }) => {
  return (
    <Flex direction={{ base: "column", md: "row" }} {...props}>
      {React.Children.map(children, (child, index) => (
        <Box flex={{ md: 1 }} mb={{ base: gap, md: 0 }} ml={index > 0 ? { md: "auto" } : 0}>
          {child}
        </Box>
      ))}
    </Flex>
  );
};

export default TwoColumnLayout;
