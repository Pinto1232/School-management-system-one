import { Flex } from "@chakra-ui/react";

const StickyFooter = ({ children, bgColor, fontSize, bgTextColor }) => {
  return (
    <Flex
      as="footer"
      bg={bgColor}
      fontSize={fontSize}
      color={bgTextColor}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      height="50px"
      justify="center"
      align="center"
      borderTopWidth="1px"
      borderTopColor="gray.200"
      zIndex="docked"
    >
      {children}
    </Flex>
  );
};

export default StickyFooter;
