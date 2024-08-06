// src/components/Statistics.js
import React from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { green, red } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Statistics = () => {
  return (
    <Paper sx={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="subtitle1" color="textSecondary">This Month Statistics</Typography>
      <Typography variant="h6" gutterBottom>Tue, 14 Nov, 2024, 11:30 AM</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="h4" sx={{ marginRight: '8px' }}>ETB 9460.00</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', color: red[500] }}>
          <ArrowDownwardIcon fontSize="small" />
          <Typography variant="body2" sx={{ marginLeft: '4px' }}>1.5%</Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="textSecondary">Compared to ETB 9940 last month</Typography>
      <Typography variant="body2" color="textSecondary">Last Month Income ETB 25658.00</Typography>
    </Paper>
  );
};

export default Statistics;
