// src/components/Header.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Topbar = () => {
  return (
    <Box sx={{ padding: '16px 24px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
      <Typography variant="h5">Admin / Dashboard</Typography>
    </Box>
  );
};

export default Topbar;
