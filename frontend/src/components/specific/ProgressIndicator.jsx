import { useState, useEffect } from "react";
import { Box, Text, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

const ProgressIndicator = ({ value, maxValue, color, label }) => {
    const [percent, setPercent] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let interval = null;
        if (percent < value) {
            interval = setInterval(() => {
                setPercent((prevPercent) => prevPercent + 1);
            }, 10);
        } else if (percent === value) {
            setIsComplete(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [percent, value]);

    useEffect(() => {
        if (percent === maxValue) {
            setIsComplete(true);
        } else {
            setIsComplete(false);
        }
    }, [percent, maxValue]);

    return (
        <Box
            w="100%"
            maxW="600px"
            p="4"
            m="auto"
            borderRadius="md"
            boxShadow="md"
            bgGradient="linear(to-r, teal.500,green.500)"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            mb={'20px'}
        >
            <CircularProgress value={percent} size="120px" thickness="12px" color={color}>
                <CircularProgressLabel fontSize="2xl">{percent}%</CircularProgressLabel>
            </CircularProgress>
            <Text mt="4" fontSize="lg" fontWeight="bold">
                {isComplete ? "Task complete!" : "Task in progress..."}
            </Text>
        </Box>
    );
};

export default ProgressIndicator;
