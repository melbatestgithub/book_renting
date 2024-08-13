import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { Edit, Delete, Circle } from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LiveBookStatus = () => {
  const [uploadedBook, setUploadedBook] = useState([]);
  const [loading, setLoading] = useState(false); // Spinner for fetching data
  const [updating, setUpdating] = useState(false); // Spinner for updating data
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updatedBookDetails, setUpdatedBookDetails] = useState({});
  
  const user = JSON.parse(localStorage.getItem('user'));
  const bookOwner = `${user.firstName} ${user.lastName}`;

  useEffect(() => {
    const getUploadedBook = async () => {
      setLoading(true); // Start spinner
      try {
        const res = await axios.get("https://book-renting-server-side.onrender.com/uploadedBook", {
          params: { bookOwner }
        });
        setUploadedBook(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Stop spinner
      }
    };

    getUploadedBook();
  }, []);

  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    setUpdatedBookDetails(book);
    setOpenUpdateModal(true);
  };

  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setOpenDeleteModal(true);
  };

  const handleUpdateSubmit = async () => {
  
    setUpdating(true); // Start spinner
    try {
      await axios.put(`https://book-renting-server-side.onrender.com/uploadedBook/update/${selectedBook.id}`, updatedBookDetails);
      setOpenUpdateModal(false);
      // You may want to update the state or trigger a re-fetch here
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log("You are not authorized to update this book");
        // Display a message to the user indicating that they are not authorized
      } else {
        console.log("An error occurred:", error.message);
        // Handle other types of errors
      }
    } finally {
      setUpdating(false); // Stop spinner
    }
  };

  const handleDeleteSubmit = async () => {
    if (!selectedBook) return; // Ensure a book is selected
  
    setUpdating(true); // Start spinner
    try {
      // Perform the delete request
      await axios.delete(`https://book-renting-server-side.onrender.com/uploadedBook/delete/${selectedBook.id}`);
      
      // Remove the deleted book from the state
      setUploadedBook(uploadedBook.filter(book => book.id !== selectedBook.id));
  
      // Close the delete modal
      setOpenDeleteModal(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log("You are not authorized to delete this book");
        // Display a message to the user indicating that they are not authorized
      } else {
        console.log("An error occurred:", error.message);
        // Handle other types of errors
      }
    } finally {
      setUpdating(false); // Stop spinner
    }
  };
  
  const getStatusIcon = (status) => {
    const iconColor = status === "Rented" ? "#FF0000" : "#00ABFF";
    return <Circle sx={{ color: iconColor, ml: 1 }} />;
  };

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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : uploadedBook.length >= 1 ? (
              uploadedBook.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.book_number}</TableCell>
                  <TableCell>{row.book_name}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {getStatusIcon(row.status)}
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell>{row.book_price}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleUpdateClick(row)}><Edit sx={{ color: "#000000" }} /></IconButton>
                    <IconButton onClick={() => handleDeleteClick(row)}><Delete sx={{ color: "#FF0000" }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Box sx={{ width: "200px" }}>
                <Typography sx={{ textAlign: "center", marginTop: "2rem" }}>
                  You Have Not Uploaded Any Book Yet.
                  <Link to="/book-upload"><Button color='primary' variant='button'>Upload Book</Button></Link>
                </Typography>
              </Box>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Modal */}
      <Dialog open={openUpdateModal} onClose={() => setOpenUpdateModal(false)}>
        <DialogTitle>Update Book</DialogTitle>
        <DialogContent>
          {updating ? (
            <CircularProgress />
          ) : (
            <>
              <TextField
                margin="dense"
                label="Book Name"
                fullWidth
                value={updatedBookDetails.book_name}
                onChange={(e) => setUpdatedBookDetails({ ...updatedBookDetails, book_name: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Status"
                fullWidth
                value={updatedBookDetails.status}
                onChange={(e) => setUpdatedBookDetails({ ...updatedBookDetails, status: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Price"
                fullWidth
                value={updatedBookDetails.book_price}
                onChange={(e) => setUpdatedBookDetails({ ...updatedBookDetails, book_price: e.target.value })}
              />
              <TextField
                margin="dense"
                label="Book Number"
                fullWidth
                value={updatedBookDetails.book_number}
                onChange={(e) => setUpdatedBookDetails({ ...updatedBookDetails, book_number: e.target.value })}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateModal(false)}>Cancel</Button>
          <Button onClick={handleUpdateSubmit} color="primary" disabled={updating}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this book?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>Cancel</Button>
          <Button onClick={handleDeleteSubmit} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default LiveBookStatus;
