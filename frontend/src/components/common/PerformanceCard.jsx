import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PerformanceCard = ({ title, data, initialData, options = {} }) => {
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [chartData, setChartData] = useState({
    ...initialData,
    datasets: [{
      ...initialData.datasets[0],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      borderColor: '',
      borderWidth: 0,
    }],
  });

  const seasons = ['Winter', 'Spring', 'Summer', 'Fall', 'All'];

  useEffect(() => {
    const updateChartDataForSeason = (season) => {
      const newData = { ...initialData };
      setChartData(newData);
    };

    updateChartDataForSeason(selectedSeason);
  }, [selectedSeason, initialData]);

  const mergedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '50%',
    ...options,
    plugins: {
      ...options.plugins,
      legend: {
        ...((options.plugins && options.plugins.legend) || {}),
        labels: {
          ...((options.plugins && options.plugins.legend && options.plugins.legend.labels) || {}),
          color: 'black',
        },
      },
    },
  };

  const cardBg = useColorModeValue('white', 'gray.800');
  const cardColor = useColorModeValue('black', 'white');

  return (
    <Box p={4} borderRadius="md" boxShadow="md" bg={cardBg} color={cardColor} w="full" h={'290px'}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h3" size="md">{title}</Heading>
        <Menu>
          <MenuButton colorScheme="teal" as={Button} rightIcon={<ChevronDownIcon />}>
            {selectedSeason}
          </MenuButton>
          <MenuList>
            {seasons.map((season) => (
              <MenuItem key={season} onClick={() => setSelectedSeason(season)}>
                {season}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
      <Flex w="100%" h="200px" justifyContent="space-around" alignItems="center"> {/* Custom width and height */}
        {[1, 2, 3].map((_, index) => (
          <Box key={index} w="calc(100% / 3)" h="100%" p={2}>
            <Doughnut data={chartData} options={mergedOptions} />
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default PerformanceCard;
