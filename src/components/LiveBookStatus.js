// src/components/LiveBookStatus.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  CircularProgress
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import axios from 'axios';

const LiveBookStatus = () => {
  const [uploadedBook, setUploadedBook] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getUploadedBook = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get("https://book-renting-server-side.onrender.com/uploadedBook/getAll");
        setUploadedBook(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("Error", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getUploadedBook();
  }, []);

  return (
    <Paper sx={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="subtitle1" color="textSecondary">Live Book Status</Typography>
      {loading ? (
        // Display spinner while loading
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : (
        // Display table once data is loaded
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Book no.</TableCell>
                <TableCell>Book Name</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uploadedBook.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.book_number}</TableCell>
                  <TableCell>{row.book_name}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt={row.book_owner} src={`/static/images/avatar/${index + 1}.jpg`} sx={{ marginRight: '8px' }} />
                      {row.book_owner}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: row.status === 'Rented' ? red[500] : green[500] }}>
                      <Typography variant="body2">{row.status}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.book_price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default LiveBookStatus;
