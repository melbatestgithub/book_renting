import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Snackbar, CircularProgress } from '@mui/material';
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

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    acceptTerms: false,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false); // Spinner state
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
    const { email, password, confirmPassword, address, phoneNumber, acceptTerms, firstName, lastName } = formData;

    if (!acceptTerms) {
      alert('You must accept the terms and conditions to register.');
      return;
    }

    setLoading(true); // Show spinner

    try {
      const response = await axios.post('https://book-renting-server-side.onrender.com/auth/register', {
        email,
        password,
        confirmPassword,
        address,
        phoneNumber,
        firstName,
        lastName,
        role: 'Owner', // Default role
      });

      console.log('User registered successfully:', response.data);
      setOpenSnackbar(true);
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        acceptTerms: false,
      });

      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);

    } catch (error) {
      console.error('Error registering user:', error.response?.data);
    } finally {
      setLoading(false); // Hide spinner
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
            <Typography gutterBottom>
              <Typography variant='p' sx={{ fontSize: "1.5rem" }}>Signup into Book Rent</Typography>
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
                label="FirstName"
                name="firstName"
                margin="normal"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="LastName"
                name="lastName"
                margin="normal"
                value={formData.lastName}
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
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Location"
                name="address"
                margin="normal"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                margin="normal"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox name="acceptTerms" color="primary" checked={formData.acceptTerms} onChange={handleChange} />}
                label="I accept the Terms and Conditions"
                sx={{ mb: 1 }}
              />
              <Button variant="contained" color="primary" fullWidth sx={{ mb: 1 }} type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>
            </form>
            <Typography variant="body2" align="center">
              Already have an account? <Link href="/login" color="primary">Login</Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          User registered successfully!
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default SignUpPage;
