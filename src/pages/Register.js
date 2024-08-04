import React from 'react';
import { Box, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import frame from '../assets/frame.png'; 
import group1 from '../assets/Group1.png'; 

const theme = createTheme({
  typography: {
    h5: {
      fontWeight: 600,
    },
  },
});

const SignUpPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: '100vh' }}>
        {/* Image Column */}
        <Grid item xs={12} md={6} sx={{
          backgroundImage: `url(${frame})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />

        {/* Form Column */}
        <Grid item xs={12} md={6} sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
        }}>
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img src={group1} alt="Logo" style={{ width: 60, height: 33 }} />
              <Typography variant="p"  sx={{fontSize:"2rem"}}>Book Rent</Typography>
            </Box>
            <Typography  gutterBottom>
             <Typography variant='p' sx={{marginLeft:"-9rem",fontSize:"1.5rem"}}>Signup into Book Rent</Typography> 
              <Box
                component="span"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'gray',
                  marginTop: '2px'
                }}
              />
            </Typography>
            <TextField fullWidth label="Email address" margin="normal" />
            <TextField fullWidth label="Password" type="password" margin="normal" />
            <TextField fullWidth label="Confirm Password" type="password" margin="normal" />
            <TextField fullWidth label="Location" margin="normal" />
            <TextField fullWidth label="Phone Number" margin="normal" />
            <FormControlLabel
              control={<Checkbox name="acceptTerms" color="primary" />}
              label="I accept the Terms and Conditions"
              sx={{ mb: 1}}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }}>Sign Up</Button>
            <Typography variant="body2" align="center">
              Already have an account? <Link href="#" color="primary">Login</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUpPage;
