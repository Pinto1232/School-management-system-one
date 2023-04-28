import { Box, Text } from "@chakra-ui/react";

const Speedometer = ({
    minValue,
    maxValue,
    currentValue,
    colorScheme,
    className,
}) => {
    const percentage = ((currentValue - minValue) / (maxValue - minValue)) * 100;

    return (
        <Box
            className={className}
            position="relative"
            width="100px"
            height="50px"
            borderRadius="full"
            border="2px solid"
            borderColor={`${colorScheme}.300`}
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                width={`${percentage}%`}
                height="100%"
                borderRadius="full"
                bg={`${colorScheme}.300`}
            />
            <Text fontSize="sm" fontWeight="bold" textAlign="center" mt="20%">
                {currentValue}
            </Text>
        </Box>
    );
};
export default Speedometer;