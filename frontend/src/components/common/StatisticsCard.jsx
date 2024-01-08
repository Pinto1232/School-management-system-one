import React from 'react';
import { Box, Flex, Text, Icon, Tooltip, useColorModeValue, Stat, StatLabel, StatNumber, StatHelpText, StatGroup } from '@chakra-ui/react';
import { FaBookOpen, FaClock, FaAward } from 'react-icons/fa';

const StatisticsCard = ({ totalCourses, hoursSpent, achievements }) => {
    const cardBg = useColorModeValue('white', 'gray.700');
    const textColor = useColorModeValue('gray.700', 'white');

    return (
        <StatGroup borderWidth="1px" borderRadius="lg" overflow="hidden" bg={cardBg} boxShadow="sm" p={4} w="100%">
            <Stat textAlign="center" flex="1">
                <StatLabel>Total Courses</StatLabel>
                <Flex alignItems="center" justifyContent="center">
                    <Icon as={FaBookOpen} w={6} h={6} mr={2} />
                    <StatNumber fontSize="2xl">{totalCourses}</StatNumber>
                </Flex>
                <StatHelpText>Completed</StatHelpText>
            </Stat>

            <Stat textAlign="center" flex="1">
                <StatLabel>Hours Spent</StatLabel>
                <Flex alignItems="center" justifyContent="center">
                    <Icon as={FaClock} w={6} h={6} mr={2} />
                    <StatNumber fontSize="2xl">{hoursSpent}</StatNumber>
                </Flex>
                <StatHelpText>Learning</StatHelpText>
            </Stat>

            <Stat textAlign="center" flex="1">
                <StatLabel>Achievements</StatLabel>
                <Flex alignItems="center" justifyContent="center">
                    <Icon as={FaAward} w={6} h={6} mr={2} />
                    <StatNumber fontSize="2xl">{achievements}</StatNumber>
                </Flex>
                <StatHelpText>Unlocked</StatHelpText>
            </Stat>
        </StatGroup>
    );
};

export default StatisticsCard;