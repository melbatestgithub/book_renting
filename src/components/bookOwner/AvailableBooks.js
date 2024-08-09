import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Fiction', value: 54, color: '#8884d8' },
  { name: 'Self Help', value: 20, color: '#82ca9d' },
  { name: 'Business', value: 26, color: '#ffc658' }
];

const AvailableBooks = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">Available Books</Typography>
      <Typography variant="subtitle1">Today</Typography>
      <Box sx={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default AvailableBooks;
