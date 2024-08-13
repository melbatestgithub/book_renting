// src/components/Statistics.js
import React from 'react';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { green, red } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


const Statistics = () => {
  return (
    <Paper sx={{ padding: '16px', marginBottom: '16px' }}>
      <Box sx={{padding:"1rem .8rem"}}>
      <Typography variant="h5" color="
rgba(82, 82, 86, 1)" sx={{fontWeight:"semibold"}}>This Month Statistics</Typography>
      <Typography gutterBottom color="rgba(163, 163, 163, 1)">Tue, 14 Nov, 2024, 11:30 AM</Typography>
      </Box>
      
      <Paper sx={{padding:"1rem .8rem",marginTop:"2rem"}}>
        <Box sx={{display:'flex',justifyContent:"space-around",alignItems:"center"}}>
           <Typography sx={{color:"rgba(101, 101, 117, 1)"}}> Income</Typography>
           <Typography sx={{background:"rgba(244, 245, 247, 1)",padding:".6rem .5rem",color:"rgba(101, 101, 117, 1)"}}>This Month</Typography>
        </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px',marginTop:"1rem" }}>
        <Typography variant="h5" sx={{ marginRight: '8px' ,fontWeight:"bold"}} color="rgba(1, 21, 12, 1)
">ETB 9460.00</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', color: red[500] }}>
          <ArrowDownwardIcon fontSize="small" />
          <Typography variant="body2" sx={{ marginLeft: '4px' }}>1.5%</Typography>
        </Box>
      </Box>
      <Typography variant="body2" color="#656575" sx={{marginBottom:".6rem"}}>Compared to ETB 9940 last month</Typography>
      <Typography variant="p" color="#525256">Last Month Income ETB 25658.00</Typography>
      </Paper>
    </Paper>
  );
};

export default Statistics;
