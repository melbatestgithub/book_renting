import React, { useEffect } from 'react';
import { Box, Grid, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../../components/bookOwner/Sidebar';
import Header from '../../components/Topbar';
import Statistics from '../../components/bookOwner/ThisMonthStatistics';
import LiveBookStatus from '../../components/bookOwner/LiveBookStatus';
import AvailableBooks from '../../components/bookOwner/AvailableBooks';
import EarningSummary from '../../components/bookOwner/EarningSummaryChart';

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if token is present in localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const token=user?.token
    console.log(user.token)
    if (!token) {
      // Redirect to login page if token is not found
      navigate('/login');
    }
  }, [navigate]);

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
