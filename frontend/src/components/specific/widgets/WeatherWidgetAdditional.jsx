import { Box, Text } from "@chakra-ui/react";

const WeatherWidgetAdditional = ({
    temperature,
    condition,
    city,
    humidity,
    windSpeed,
    pressure,
}) => {
    return (
        <Box bg="gray.800" p={4} borderRadius="md">
            <Text fontSize="2xl" fontWeight="bold">
                {temperature}°C
            </Text>
            <Text fontSize="lg">{condition}</Text>
            <Text fontSize="md">{city}</Text>
            <Text fontSize="md">Humidity: {humidity}%</Text>
            <Text fontSize="md">Wind Speed: {windSpeed} km/h</Text>
            <Text fontSize="md">Pressure: {pressure} hPa</Text>
        </Box>
    );
};

export default WeatherWidgetAdditional;
