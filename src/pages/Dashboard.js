// src/pages/Dashboard.js
import React from 'react';
import { Box, Grid, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Topbar';
import Statistics from '../components/Statistics';
import LiveBookStatus from '../components/LiveBookStatus';
import AvailableBooks from '../components/AvailableBooks';
import EarningSummary from '../components/EarningSummary';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, backgroundColor: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ display: 'flex', flexGrow: 1, padding: '24px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box>
                <Statistics />
                <AvailableBooks sx={{ marginTop: 0 }} /> {/* Remove spacing between components */}
              </Box>
            </Grid>
            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <LiveBookStatus />
              </Box>
              <Box sx={{ height: '50%', overflow: 'auto', marginTop: '16px' }}>
                <EarningSummary />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
