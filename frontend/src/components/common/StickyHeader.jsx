import React from "react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";

const StickyHeader = ({ children, bg, color, boxShadow }) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <Flex
      as="header"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg={bg}
      color={color}
      boxShadow={boxShadow}
      p={isMobile ? 2 : 4}
      justify="center"
      align="center"
    >
      {children}
    </Flex>
  );
};

export default StickyHeader;
