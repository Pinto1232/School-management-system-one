import React from 'react';
import { Bar } from 'react-chartjs-2';

const GradeDistributionChart = ({ distributionData }) => {
  const data = {
    labels: Object.keys(distributionData),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(distributionData),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
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
  };

  return <Bar data={data} options={options} />;
};

export default GradeDistributionChart;