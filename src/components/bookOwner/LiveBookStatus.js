import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const rows = [
  { no: 1, bookNo: 6465, bookName: 'Derto Gada', status: 'Rented', price: '40 Birr' },
  { no: 2, bookNo: 6465, bookName: 'Fikr Eske Mekabr', status: 'Rented', price: '40 Birr' },
  { no: 3, bookNo: 6465, bookName: 'The Power of Now', status: 'Rented', price: '40 Birr' },
  { no: 4, bookNo: 5665, bookName: 'Derto Gada', status: 'Free', price: '0.0 Birr' },
  { no: 5, bookNo: 5665, bookName: 'Derto Gada', status: 'Free', price: '0.0 Birr' },
  { no: 6, bookNo: 1755, bookName: 'Derto Gada', status: 'Free', price: '0.0 Birr' }
];

const LiveBookStatus = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>Book no.</TableCell>
              <TableCell>Book Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.no}>
                <TableCell>{row.no}</TableCell>
                <TableCell>{row.bookNo}</TableCell>
                <TableCell>{row.bookName}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <IconButton><Edit /></IconButton>
                  <IconButton><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LiveBookStatus;
