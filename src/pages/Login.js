import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Snackbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';
import frame from '../assets/frame.png';
import group1 from '../assets/Group1.png';

const theme = createTheme({
  typography: {
    h5: {
      fontWeight: 600,
    },
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
  
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password,
      });
  
      console.log('User logged in successfully:', response.data);
      
      const { role } = response.data;  // Adjust based on your response structure
      let redirectPath = '/';
     
  
      // Check the role and set the redirect path accordingly
      if (role === 'Owner') {
        redirectPath = '/owner-dashboard';  // Adjust to your actual route
      }
      if(role==="ADMIN"){
        redirectPath="/"
      }
      console.log(response.data.role)
  
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
  
      setTimeout(() => {
        navigate(redirectPath);
      }, 2000);
    } catch (error) {
      console.error('Error logging in:', error.response.data);
      setSnackbarMessage('Login failed. Please check your credentials.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

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
              <Typography variant="p" sx={{ fontSize: "2rem" }}>Book Rent</Typography>
            </Box>
            <Typography gutterBottom sx={{ marginTop: "1rem" }}>
              <Typography variant='p' sx={{ fontSize: "1.5rem" }}>Login into Book Rent</Typography>
              <Box
                component="span"
                sx={{
                  display: 'block',
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'gray',
                  marginTop: '4px'
                }}
              />
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email address"
                name="email"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <FormControlLabel
                control={<Checkbox name="rememberMe" color="primary" checked={formData.rememberMe} onChange={handleChange} />}
                label="Remember me"
                sx={{ mb: 1 }}
              />
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} type="submit">Login</Button>
            </form>
            <Typography variant="body2" align="center">
              Have not an account? <Link href="#" color="primary">Sign up</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default LoginPage;
