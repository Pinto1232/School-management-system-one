import React from 'react';
import { Box, Text, Progress, CircularProgress, Stat, StatLabel, StatNumber, VStack } from '@chakra-ui/react';

function ActivityTracker() {
  return (
    <Box boxShadow={'md'} bg={'gray.300'} p={4} color={'black'} borderRadius="sm">
      <Text fontSize="md" flexWrap={'nowrap'} fontWeight="bold">Activity Tracking</Text>
      <Text fontSize="md">Thursday, 22 Sep</Text>
      <Progress colorScheme="blue" size="sm" value={70} mt={4} />

      <VStack spacing={4} align="stretch" mt={4}>
        <Box>
          <Text fontSize="sm">Total time</Text>
          <Text fontSize="lg" fontWeight="bold">2h 45m</Text>
        </Box>
        <Box>
          <Text fontSize="sm">Total distance</Text>
          <CircularProgress value={40} color="blue.400" size="50px" thickness="12px">
            <Text fontSize="md">5.6 km</Text>
          </CircularProgress>
        </Box>
        <Box>
          <Text fontSize="sm">Average speed</Text>
          <Stat>
            <StatLabel>6.1 p/km</StatLabel>
            <StatNumber>10 km</StatNumber>
          </Stat>
        </Box>
      </VStack>
    </Box>
  );
}

export default ActivityTracker;
