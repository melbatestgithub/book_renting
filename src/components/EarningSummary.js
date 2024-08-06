// src/components/EarningSummary.js
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { blue } from '@mui/material/colors';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mar', income: 1200, lastYear: 1100 },
  { name: 'Apr', income: 1500, lastYear: 1300 },
  { name: 'May', income: 1700, lastYear: 1600 },
  { name: 'Jun', income: 1400, lastYear: 1200 },
  { name: 'Jul', income: 1800, lastYear: 1500 },
  { name: 'Aug', income: 2000, lastYear: 1700 },
  { name: 'Sep', income: 2100, lastYear: 1900 },
  { name: 'Oct', income: 2200, lastYear: 2000 },
];

const EarningSummary = () => {
  return (
    <Paper sx={{ padding: '16px' }}>
      <Typography variant="subtitle1" color="textSecondary">Earning Summary</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke={blue[500]} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="lastYear" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default EarningSummary;
