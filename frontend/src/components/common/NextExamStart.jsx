import React, { useState, useEffect } from 'react';
import { Box, Text, Divider, VStack, HStack } from '@chakra-ui/react';

const NextExamStart = ({ title, examDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(examDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bgGradient="linear(to-r, blue.400, green.400)" >
            <VStack spacing={4}>
                <Text fontSize="xl" fontWeight="bold" whiteSpace="nowrap">
                    {title}
                </Text>
                <Divider />
                <HStack spacing={8} justifyContent="center">
                    {Object.keys(timeLeft).length > 0 ? (
                        Object.keys(timeLeft).map((interval) => (
                            <VStack key={interval}>
                                <Box
                                    pt={2}
                                    pb={1}
                                    borderBottom="1px solid"
                                    borderColor="gray.200"
                                >
                                    <Text fontSize="2xl" fontWeight="semibold">
                                        {timeLeft[interval]}
                                    </Text>
                                </Box>
                                <Text fontSize="md">{capitalizeFirstLetter(interval)}</Text>
                            </VStack>
                        ))
                    ) : (
                        <Text>Time's up!</Text>
                    )}
                </HStack>
            </VStack>
        </Box>
    );
};

export default NextExamStart;