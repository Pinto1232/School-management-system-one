import { Box, Flex, Heading, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const CardInfo = ({
  icon,
  iconSize = 70,
  iconBgColor = "blue.500",
  iconColor = "white",
  imageSrc,
  heading,
  price,
  height = "auto",
}) => {
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const dynamicWidth = useBreakpointValue({ base: "225px", md: "230px" });
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardColor = useColorModeValue('gray.700', 'white');

  const IconComponent = icon ? React.cloneElement(icon, { size: iconSize, color: iconColor }) : null;

  return (
    <Flex
      direction={flexDirection}
      bg={cardBg}
      color={cardColor}
      p={6}
      borderRadius="lg"
      boxShadow="2xl"
      alignItems="center"
      justifyContent="space-between"
      cursor={"pointer"}
      width={dynamicWidth}
      minWidth={dynamicWidth}
      height={height}
      transition="all 0.3s ease-in-out"
      _hover={{ transform: "scale(1.02)" }}
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
      <Box ml={{ base: 0, md: 2 }} mt={{ base: 2, md: 0 }} whiteSpace={"nowrap"}>
        <Heading size="md" mb={2}>
          {heading}
        </Heading>
        <Text>R{parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>

      </Box>
    </Flex>
  );
};

export default CardInfo;
