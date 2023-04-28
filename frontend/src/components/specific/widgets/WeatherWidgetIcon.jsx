import { Box, Text, Image } from "@chakra-ui/react";

const WeatherWidgetIcon = ({ iconSrc, temperature, condition, city }) => {
    return (
        <Box bg="gray.800" p={4} borderRadius="md">
            <Image src={iconSrc} alt={condition} maxH="50px" mx="auto" />
            <Text fontSize="2xl" fontWeight="bold">
                {temperature}°C
            </Text>
            <Text fontSize="lg">{condition}</Text>
            <Text fontSize="md">{city}</Text>
        </Box>
    );
};

export default WeatherWidgetIcon;
