import { Box, Flex, Text } from "@chakra-ui/react";

const WeatherWidgetSimple = ({ cardW, cardH, bgColor, temperature, condition, city, tempColor }) => {
  return (
    <Box
      bg={bgColor}
      justify="center"
      alignItems={'center'}
      justifyContent={'center'}
      p={4} borderRadius="md"
      height={cardH}
    >
      <Flex gap={2} fontSize="2xl"
        fontWeight="bold">
        <Text color={tempColor}>{temperature}</Text>°C
      </Flex>
      <Text fontSize="lg">{condition}</Text>
      <Text fontSize="md">{city}</Text>
    </Box>
  );
};

export default WeatherWidgetSimple;
