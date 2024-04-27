import React from 'react';
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PerformanceCard = ({ title, performanceData, options = {} }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const cardColor = useColorModeValue('black', 'white');

  // Ensure default colors if not provided
  if (performanceData && performanceData.datasets) {
    performanceData.datasets = performanceData.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: dataset.backgroundColor || ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      borderColor: dataset.borderColor || '#FFFFFF',
      borderWidth: dataset.borderWidth || 1,
    }));
  }

  return (
    <Box
    p={4}
    borderRadius="md"
    boxShadow="md"
    bg={cardBg}
    color={cardColor}
    w="full"
    h="auto"
  >
    <Flex justifyContent="space-between" alignItems="center" mb={4}>
      <Heading as="h3" size="md">
        {title}
      </Heading>
    </Flex>
    <Flex
      w="100%"
      justifyContent="space-around"
      alignItems="center"
      wrap="wrap"
    >
      {performanceData.map((data, index) => (
        <Box key={index} p={2} w="300px" h="300px">
          <Doughnut data={data} />
        </Box>
      ))}
    </Flex>
  </Box>
  );
};

export default PerformanceCard;