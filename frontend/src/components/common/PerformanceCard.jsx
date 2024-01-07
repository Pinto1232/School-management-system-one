import React, { useState } from 'react';
import { Box, Flex, Text, Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PerformanceCard = ({ title, data, options }) => {
  const [selectedSeason, setSelectedSeason] = useState('All');

  const seasons = ['Winter', 'Spring', 'Summer', 'Fall', 'All'];

  return (
    <Box p={4} borderRadius="md" boxShadow="md" bg="white" w="full">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="lg" color={'black'} fontWeight="bold">{title}</Text>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
      <Line data={data} options={options} />
    </Box>
  );
};

export default PerformanceCard;