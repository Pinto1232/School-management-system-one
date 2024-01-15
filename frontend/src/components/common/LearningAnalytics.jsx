import React from 'react';
import { ComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, useColorModeValue, Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Wrap the Bar component with motion to apply animations
const MotionBar = motion(Bar);

const LearningAnalytics = ({ analyticsData, title }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const colors = ['#3182CE', '#63B3ED', '#4299E1', '#2B6CB0', '#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

  const data = analyticsData.map(item => ({
    name: item.component,
    timeSpent: item.timeSpent,
    halfTimeSpent: item.timeSpent * 0.5,
  }));

  return (
    <Box bg={bgColor} p={4} borderRadius="lg" boxShadow="xl">
      <Heading as="h2" size="lg" textAlign="center" mb={4}>
        {title}
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <MotionBar
            dataKey="timeSpent"
            stackId="a"
            barSize={160}
            fill={colors[0]}
            whileHover={{ scale: 1.1 }}
          />
          <MotionBar
            dataKey="halfTimeSpent"
            stackId="a"
            barSize={20}
            fill={colors[1]}
            whileHover={{ scale: 1.1 }}
          />
          <Area dataKey="halfTimeSpent" fill={colors[1]} stroke={colors[1]} stackId="a" />
          <Line type="monotone" dataKey="timeSpent" stroke={colors[2]} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LearningAnalytics;