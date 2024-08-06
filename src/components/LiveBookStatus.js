// src/components/LiveBookStatus.js
import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import { green, red } from '@mui/material/colors';
const createData = (bookNo, owner, status, price) => {
  return { bookNo, owner, status, price };
};

const rows = [
  createData('6465', 'Nardos T', 'Rented', '40 Birr'),
  createData('6465', 'Nardos T', 'Rented', '40 Birr'),
  createData('6465', 'Nardos T', 'Rented', '40 Birr'),
  createData('5665', 'Harry M', 'Free', '0.0 Birr'),
  createData('5665', 'Harry M', 'Free', '0.0 Birr'),
  createData('1755', 'Tesfu N', 'Free', '0.0 Birr'),
];

const LiveBookStatus = () => {
  return (
    <Paper sx={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="subtitle1" color="textSecondary">Live Book Status</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Book no.</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.bookNo}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={row.owner} src={`/static/images/avatar/${index + 1}.jpg`} sx={{ marginRight: '8px' }} />
                    {row.owner}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: row.status === 'Rented' ? red[500] : green[500] }}>
                    <Typography variant="body2">{row.status}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LiveBookStatus;
