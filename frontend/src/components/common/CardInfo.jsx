import { Box, Flex, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

const CardInfo = ({
  icon,
  iconSize = 70,
  iconBgColor = "blue.500",
  iconColor = "white",  // New prop for icon color
  imageSrc,
  heading,
  text,
  bgColor = "white",
  textColor = "black",
  width = "auto",
  height = "auto",
}) => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });

  // Clone the icon and set its size and color dynamically
  const IconComponent = icon ? React.cloneElement(icon, { size: iconSize, color: iconColor }) : null;

  return (
    <Flex
      direction={flexDirection}
      bg={bgColor}
      color={textColor}
      p={4}
      borderRadius="md"
      boxShadow="md"
      alignItems="center"
      justifyContent="space-between"
      width={width}
      height={height}
      transition="all 0.3s ease-in-out"  // Add this line for smooth transition
      _hover={{ boxShadow: "xl" }}  // Add this line to have a larger boxShadow on hover
    >
      <Box flexShrink={0}>
        {IconComponent && (
          <Box
            bg={iconBgColor}
            borderRadius="full"
            p={2}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
          >
            {IconComponent}
          </Box>
        )}
        {imageSrc ? <img src={imageSrc} alt={heading} /> : null}
      </Box>
      <Box ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }}>
        <Heading size="md" mb={2}>
          {heading}
        </Heading>
        <Text>{text}</Text>
      </Box>
    </Flex>
  );
};

export default CardInfo;
