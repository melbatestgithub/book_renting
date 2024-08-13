import React, { useEffect } from 'react';
import { Box, Grid, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Topbar';
import Statistics from '../components/Statistics';
import LiveBookStatus from '../components/LiveBookStatus';
import AvailableBooks from '../components/AvailableBooks';
import EarningSummary from '../components/EarningSummary';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is present in localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Check if user exists and if it has a token property
    if (!user || !user.token) {
      // Redirect to login page if user is not found or token is missing
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', }}>
      <CssBaseline />
      <Sidebar />
      <Box sx={{ flexGrow: 1, backgroundColor: '#f0f2f5', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box sx={{ display: 'flex', flexGrow: 1, padding: '24px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ background: "#ffffff" }}>
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
