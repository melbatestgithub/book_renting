import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
  { name: 'May', last6Months: 200000, lastYear: 150000 },
  { name: 'Jun', last6Months: 240000, lastYear: 180000 },
  { name: 'Jul', last6Months: 220000, lastYear: 200000 },
  { name: 'Aug', last6Months: 260000, lastYear: 230000 },
  { name: 'Sep', last6Months: 280000, lastYear: 240000 },
  { name: 'Oct', last6Months: 300000, lastYear: 250000 },
];

const EarningSummaryChart = () => {
  return (
    <Box sx={{ p: 2, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
      <Typography variant="h6" gutterBottom>Earning Summary</Typography>
      <Typography variant="subtitle2" gutterBottom>Mar 2022 - Oct 2024</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="last6Months" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="lastYear" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default EarningSummaryChart;
