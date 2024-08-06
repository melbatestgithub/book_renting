import React from 'react';
import { Box, Typography, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Earning', value: 400 },
  { name: 'Spent', value: 300 }
];

const COLORS = ['#0088FE', '#FFBB28'];

const Body = () => {
  return (
    <Box
      sx={{
        marginTop: '20px',
        marginLeft: '480px',
        overflowY: 'scroll',
        maxHeight: '80vh',
        padding: '20px',
        flexGrow: 1,
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">Live Book Status</Typography>
        <Box>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>
      <Paper elevation={3} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Book No</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Example data, replace with your data */}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>12345</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <img src="profile-pic-url" alt="profile" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                  John Doe
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'red', marginRight: '10px' }}></Box>
                  Rented
                </Box>
              </TableCell>
              <TableCell>ETB 200.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Paper elevation={3} sx={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6">Earning Summary</Typography>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Body;
