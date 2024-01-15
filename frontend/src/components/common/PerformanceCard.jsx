import React, { useState, useRef, useEffect } from 'react';
import { Box, Flex, Text, Menu, MenuButton, Button, MenuList, MenuItem, Heading } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const PerformanceCard = ({ title, data, initialData, options = {} }) => {
    const [selectedSeason, setSelectedSeason] = useState('All');
    const [chartData, setChartData] = useState(initialData);

    const chartRef = useRef(null);
    const seasons = ['Winter', 'Spring', 'Summer', 'Fall', 'All'];

    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const ctx = chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);
            gradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
            gradient.addColorStop(0.5, 'rgba(0, 255, 0, 0.5)');
            gradient.addColorStop(1, 'rgba(128, 0, 128, 0.5)');


            chart.data.datasets.forEach((dataset) => {
                dataset.backgroundColor = gradient;
            });

            chart.update();
        }
    }, [data]);

    useEffect(() => {
        const updateChartDataForSeason = (season) => {
            // Here you would have logic to filter or modify the initialData based on the season
            // For example, you might have a different dataset for each season
            // This is a placeholder function, you'll need to implement this based on your data structure
            const newData = { ...initialData };
            setChartData(newData);
        };

        updateChartDataForSeason(selectedSeason);
    }, [selectedSeason, initialData]);

    const mergedOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
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

    return (
        <Box p={4} borderRadius="md" boxShadow="md" bg="white" w="full" h={'290px'}>
            <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Heading as="h3" color={'black'} size="lg">{title}</Heading>
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
            <Line ref={chartRef} data={chartData} options={mergedOptions} />
        </Box>
    );
};

export default PerformanceCard; 
