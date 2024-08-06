import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Switch, IconButton, Button, TextField, InputAdornment } from '@mui/material';
import { Visibility, Delete, Search } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Owners = () => {
  const rows = Array(10).fill({
    owner: 'Nardos T',
    upload: '15 Books',
    location: 'Addis Ababa',
    status: true,
    action: 'Approve'
  });

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
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{String(index + 1).padStart(2, '0')}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <img
                            src="https://via.placeholder.com/40"
                            alt="Owner"
                            style={{ borderRadius: '50%', marginRight: '10px' }}
                          />
                          {row.owner}
                        </Box>
                      </TableCell>
                      <TableCell>{row.upload}</TableCell>
                      <TableCell>{row.location}</TableCell>
                      <TableCell>
                        <Switch checked={row.status} />
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
                          color={row.action === 'Approve' ? 'primary' : 'default'}
                        >
                          {row.action}
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
