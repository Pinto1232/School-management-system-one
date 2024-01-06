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
                minutes: Math.floor((difference / 1000 / 60) % 60),
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

    return (
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="md"  bgGradient="linear(to-r, blue.400, green.400)" >
            <VStack spacing={4}>
                <Text fontSize="md" fontWeight="bold" whiteSpace="nowrap">
                    {title}
                </Text>
                <Divider />
                <HStack spacing={8} justifyContent="center">
                    {Object.keys(timeLeft).length > 0 ? (
                        Object.keys(timeLeft).map((interval) => (
                            <VStack key={interval}>
                                <Text fontSize="lg" fontWeight="semibold">
                                    {timeLeft[interval]}
                                </Text>
                                <Text fontSize="sm">{interval}</Text>
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