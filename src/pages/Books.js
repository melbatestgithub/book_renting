// src/pages/Books.js

import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Switch, IconButton, Avatar } from '@mui/material';
import { Search as SearchIcon, ViewList as ViewListIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import profilePic from '../assets/avatar_img.jpg'; // Placeholder for profile picture

const booksData = [
  { id: 1, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
  { id: 2, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
  { id: 3, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
  { id: 4, author: 'Harry', owner: 'Nardos T', category: 'Fiction', bookName: 'Drerto Gada', status: 'Active' },
  // Add more data as needed
];

const Books = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Admin/Books
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" colSpan={6}>
                  <Typography variant="h6">List of Owners</Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                  <IconButton>
                    <ViewListIcon />
                  </IconButton>
                  <IconButton>
                    <FilterListIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Book Name</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {booksData.map((book, index) => (
                <TableRow key={book.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={profilePic} alt={book.owner} style={{ marginRight: '10px' }} />
                      {book.owner}
                    </div>
                  </TableCell>
                  <TableCell>{book.category}</TableCell>
                  <TableCell>{book.bookName}</TableCell>
                  <TableCell>
                    <Switch
                      checked={book.status === 'Active'}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    <Typography variant="body2" style={{ display: 'inline', marginLeft: '10px' }}>
                      {book.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Books;
