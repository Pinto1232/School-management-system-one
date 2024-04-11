import React, { useState, useEffect } from 'react';
import { Box, Flex, Menu, MenuButton, Button, MenuList, MenuItem, Heading, useColorModeValue } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PerformanceCard = ({ title, data, initialData, options = {} }) => {
    const [selectedSeason, setSelectedSeason] = useState('All');
    const [chartData, setChartData] = useState({
        ...initialData,
        datasets: [{
            ...initialData.datasets[0],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Different colors for each section
            borderColor: '', // White border around each section
            borderWidth: 0, // Border width
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
        maintainAspectRatio: false, // Allows for custom width and height
        cutout: '50%', // This reduces the size of the doughnut hole
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
                <Heading as="h3" size="lg">{title}</Heading>
                <Menu>
                    <MenuButton colorScheme="blue" as={Button} rightIcon={<ChevronDownIcon />}>
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
            <Box w="100%" h="200px"> {/* Custom width and height */}
                <Doughnut data={chartData} options={mergedOptions} />
            </Box>
        </Box>
    );
};

export default PerformanceCard;
