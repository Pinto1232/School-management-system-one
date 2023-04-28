import { Box, Text } from "@chakra-ui/react";

const WeatherWidgetSimple = ({ temperature, condition, city }) => {
  return (
    <Box bg="gray.800" p={4} borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold">
        {temperature}°C
      </Text>
      <Text fontSize="lg">{condition}</Text>
      <Text fontSize="md">{city}</Text>
    </Box>
  );
};

export default WeatherWidgetSimple;
