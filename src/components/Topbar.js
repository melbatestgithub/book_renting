// src/components/Header.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Topbar = () => {
  return (
    <Box sx={{ padding: '16px 28px', backgroundColor: '#ffffff', borderBottom: '1px solid #ddd' ,margin:'1rem 1.4rem',borderRadius:"1rem"}}>
      <Typography variant="h5"><span style={{fontWeight:"bold"}}>Admin</span> /<span style={{color:"rgba(0, 0, 0, 0.5)"}}>Dashboard</span> </Typography>
    </Box>
  );
};

export default Topbar;
