import { Box, Flex, Text } from "@chakra-ui/react";

const WeatherWidgetAdditional = ({
    temperature,
    condition,
    city,
    humidity,
    windSpeed,
    pressure,
    percentageColor,
    weatherBg
}) => {
    return (
        <Box bg={weatherBg} p={4} borderRadius="md">
            <Flex gap={2} fontSize="2xl" fontWeight="bold">
                <Text color={percentageColor}>{temperature}</Text>°C
            </Flex>
            <Text fontSize="lg">{condition}</Text>
            <Text fontSize="md">{city}</Text>
            <Text fontSize="md">Humidity: {humidity}%</Text>
            <Text fontSize="md">Wind Speed: {windSpeed} km/h</Text>
            <Text fontSize="md">Pressure: {pressure} hPa</Text>
        </Box>
    );
};

export default WeatherWidgetAdditional;
