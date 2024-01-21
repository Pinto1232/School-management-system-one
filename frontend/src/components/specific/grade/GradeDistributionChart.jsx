import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';

const GradeDistributionChart = ({ distributionData }) => {
    const data = {
        labels: Object.keys(distributionData),
        datasets: [
            {
                label: 'Number of Students',
                data: Object.values(distributionData),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],
                borderColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6384',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <Box height="300px" width="100%">
            <Bar data={data} options={options} />
        </Box>
    );
};

export default GradeDistributionChart;