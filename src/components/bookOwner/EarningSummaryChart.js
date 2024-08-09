import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'May', last6Months: 150, lastYear: 120 },
  { name: 'Jun', last6Months: 200, lastYear: 170 },
  { name: 'Jul', last6Months: 180, lastYear: 150 },
  { name: 'Aug', last6Months: 220, lastYear: 200 },
  { name: 'Sep', last6Months: 210, lastYear: 190 },
  { name: 'Oct', last6Months: 230, lastYear: 210 },
];

const EarningSummaryChart = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Earning Summary</Typography>
      <Typography variant="subtitle1">Mar 2022 - Oct 2024</Typography>
      <Box sx={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
    </Paper>
  );
};

export default EarningSummaryChart;
