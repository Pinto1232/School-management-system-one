import React from 'react';
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Box, useColorModeValue, Heading } from '@chakra-ui/react';

const LearningAnalytics = ({ analyticsData, title }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const colors = ['#3182CE', '#63B3ED', '#4299E1', '#2B6CB0', '#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

  const data = analyticsData.map(item => ({
    name: item.component,
    timeSpent: item.timeSpent,
    halfTimeSpent: item.timeSpent * 0.5,
  }));

  // Calculate staggered animation begin times based on index
  const calculateAnimationBegin = (index) => index * 150;

  return (
    <Box bg={bgColor} p={4}  boxShadow="xl">
      <Heading as="h2" size="lg" textAlign="center" mb={4}>
        {title}
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="timeSpent"
            stackId="a"
            fill={colors[0]}
            animationDuration={2000}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                animationBegin={calculateAnimationBegin(index)}
              />
            ))}
          </Bar>
          <Bar
            dataKey="halfTimeSpent"
            stackId="a"
            fill={colors[1]}
            animationDuration={2000}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[(index + 1) % colors.length]}
                animationBegin={calculateAnimationBegin(index)}
              />
            ))}
          </Bar>
          <Area
            type="monotone"
            dataKey="halfTimeSpent"
            fill={colors[1]}
            stroke={colors[1]}
            animationBegin={500}
            animationDuration={2000}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            dataKey="timeSpent"
            stroke={colors[2]}
            animationBegin={1000}
            animationDuration={2000}
            animationEasing="ease-out"
            strokeWidth={2}
            dot={{ stroke: colors[2], strokeWidth: 2 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LearningAnalytics;