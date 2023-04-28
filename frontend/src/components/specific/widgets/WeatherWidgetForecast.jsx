import { Box, Text, Flex, Image } from "@chakra-ui/react";

const WeatherWidgetForecast = ({
    temperature,
    condition,
    city,
    forecast,
}) => {
    return (
        <Box bg="gray.800" p={4} borderRadius="md">
            <Text fontSize="2xl" fontWeight="bold">
                {temperature}°C
            </Text>
            <Text fontSize="lg">{condition}</Text>
            <Text fontSize="md">{city}</Text>
            <Flex mt={4}>
                {Array.isArray(forecast) && forecast.map((item) => (
                    <Box key={item.id} mx={2} textAlign="center">
                        <Text fontSize="sm">{item.day}</Text>
                        <Image src={item.iconSrc} alt={item.condition} maxH="30px" mx="auto" />
                        <Text fontSize="sm">{item.temperature}°C</Text>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default WeatherWidgetForecast;
