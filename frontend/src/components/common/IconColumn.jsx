// IconColumn.js
import * as React from "react";
import { Box, Icon, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

const IconColumn = ({ icon, title, textColor, bgColor }) => {
  const IconColor = useColorModeValue("#fff", "#3182ce");
  const IncosBgColor = useColorModeValue("#319795", "#fff");

  return (
    <Box textAlign="center" bg={bgColor} p={10} boxShadow="2xl" borderRadius={'sm'}>
      <Icon
        borderRadius="full"
        border="2px solid white"
        as={icon}
        boxSize={16}
        bg={IncosBgColor}
        color={IconColor}
        p={1}
      />
      <Text mt={1} fontSize={'larger'} color={textColor}>
        {title}
      </Text>
    </Box>
  );
};

export default IconColumn;
