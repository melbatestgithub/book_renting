import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const ThisMonthStatistics = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6">This Month Statistics</Typography>
      <Typography variant="subtitle1">Tue, 14 Nov, 2024, 11:30 AM</Typography>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4">ETB 9460.00 <span style={{ color: 'red' }}>↓ 1.5%</span></Typography>
        <Typography variant="subtitle2">Compared to ETB 9940 last month</Typography>
        <Typography variant="body2">Last Month Income ETB 25658.00</Typography>
      </Box>
    </Paper>
  );
};

export default ThisMonthStatistics;
