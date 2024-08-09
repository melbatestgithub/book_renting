import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import { Visibility, Delete, Search } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import axios from 'axios';

const Owners = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    const getBookOwners = async () => {
      try {
        const res = await axios.get("http://localhost:8000/book-owner/getAll");
        setOwners(res.data);
        console.log(res.data); // This will log the entire array of owners
      } catch (error) {
        console.error(error);
      }
    };

    getBookOwners();
  }, []);

  const handleApprove = async (userId) => {
    try {
      // Make sure userId is being passed correctly
      console.log("Approving user with ID:", userId);
  
      // Update the user's approval status on the server
      await axios.put(`http://localhost:8000/book-owner/approve/${userId}`);
  
      // Update the local state to reflect the change
      setOwners((prevOwners) =>
        prevOwners.map((owner) =>
          owner.id === userId ? { ...owner, approved: true } : owner
        )
      );
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };


  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1 }}>
        <Topbar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>Admin/Owners</Typography>
          
          {/* Search Bar */}
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Upload</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {owners.map((owner, index) => (
                    <TableRow key={owner.id}>
                      <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src="https://via.placeholder.com/40"
                            alt="Owner"
                            style={{ borderRadius: '50%', marginRight: '10px' }}
                          />
                          {owner.firstName} {owner.lastName}
                        </Box>
                      </TableCell>
                      <TableCell>{`${owner.total_upload} Books` }</TableCell> {/* Replace 'upload' with the correct property */}
                      <TableCell>{owner.address || 'N/A'}</TableCell> {/* Replace 'location' with the correct property */}
                      <TableCell>
                        <Switch checked={owner.status || false} />
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <Visibility />
                        </IconButton>
                        <IconButton>
                          <Delete />
                        </IconButton>
                        <Button
                          variant="contained"
                          sx={{ 
                            backgroundColor: owner.approved ? "#00ABFF" : "#AFAFAF", 
                            color: owner.approved ? "#fff" : "#000"
                          }}
                          onClick={() => handleApprove(owner.id)}
                        >
                          {owner.approved ? 'Approved' : 'Approve'}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Owners;
