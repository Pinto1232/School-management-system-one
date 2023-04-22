import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const RandomCounterTwo = ({ title, initialCount, color }) => {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 20);

        return () => clearInterval(timer);
    }, []);

    return (
        <Box textAlign="center">
            <Text fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }} fontWeight="bold" color={color}>
                {count}
            </Text>
            <Text fontSize={{ base: "md", sm: "lg", md: "xl" }} fontWeight="bold" color="gray.600">
                {title}
            </Text>
        </Box>
    );
};

export default RandomCounterTwo;
