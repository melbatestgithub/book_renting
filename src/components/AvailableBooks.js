// src/components/AvailableBooks.js
import React from 'react';
import { Box, Typography, Paper, CircularProgress, Avatar } from '@mui/material';
import { blue, green, red } from '@mui/material/colors';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Fiction', value: 54, color: blue[500] },
  { name: 'Self Help', value: 20, color: green[500] },
  { name: 'Business', value: 26, color: red[500] },
];

const AvailableBooks = () => {
  return (
    <Paper sx={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="subtitle1" color="textSecondary">Available Books</Typography>
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx={125}
          cy={125}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        {data.map((entry, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
            <Box sx={{ width: '16px', height: '16px', backgroundColor: entry.color, marginRight: '8px' }} />
            <Typography variant="body2">{entry.name}</Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default AvailableBooks;
