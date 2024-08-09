import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem, InputLabel, FormControl, Select, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import smile from '../../assets/smile 1.png'
const BookUploadPage = () => {
  const [book, setBook] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [openAddBook, setOpenAddBook] = useState(false);
  const [openCongrats, setOpenCongrats] = useState(false);
  const [newBook, setNewBook] = useState({
    bookName: '',
    authorName: '',
    category: '',
  });

  const handleBookChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'add') {
      setOpenAddBook(true);
    } else {
      setBook(selectedValue);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleUploadCover = () => {
    // Handle book cover upload
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', { book, quantity, price });
    setOpenCongrats(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBook = () => {
    // Handle adding the new book (you can add this to your book list)
    console.log('New Book:', newBook);
    setBook(newBook.bookName); // Set the newly added book as the selected book
    setOpenAddBook(false); // Close the modal
  };

  const handleClose = () => {
    setOpenAddBook(false);
  };

  const handleCongratsClose = () => {
    setOpenCongrats(false);
    // Add any additional actions on close, e.g., redirecting the user
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>Upload New Book</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', gap: 2 }}>
        <TextField
          select
          label="Search book by name or Author"
          value={book}
          onChange={handleBookChange}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          <MenuItem value="Book 1">Book 1</MenuItem>
          <MenuItem value="Book 2">Book 2</MenuItem>
          <MenuItem value="add">Add</MenuItem>
        </TextField>

        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel>Book Quantity</InputLabel>
            <Select
              value={quantity}
              onChange={handleQuantityChange}
              label="Book Quantity"
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Rent price for 2 weeks"
            value={price}
            onChange={handlePriceChange}
            fullWidth
          />
        </Box>

        <IconButton
          color="primary"
          aria-label="upload book cover"
          component="span"
          sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          onClick={handleUploadCover}
        >
          <UploadFileIcon />
          <Typography>Upload Book Cover</Typography>
        </IconButton>

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ width: '100%', mt: 2 }}
        >
          Submit
        </Button>
      </Box>

      {/* Modal for adding a new book */}
      <Dialog open={openAddBook} onClose={handleClose}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="bookName"
            label="Book Name"
            type="text"
            fullWidth
            value={newBook.bookName}
            onChange={handleModalChange}
          />
          <TextField
            margin="dense"
            name="authorName"
            label="Author Name"
            type="text"
            fullWidth
            value={newBook.authorName}
            onChange={handleModalChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={newBook.category}
            onChange={handleModalChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleAddBook} color="primary">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Congratulatory Modal */}
      <Dialog open={openCongrats} onClose={handleCongratsClose}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 5 }}>
          <img src={smile} alt="Smiley" width={100} height={100} />
          <Typography variant="h5" gutterBottom>Congrats!</Typography>
          <Typography>Your have uploaded the book successfully. Wait until we approve it.</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button onClick={handleCongratsClose} variant="contained" color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookUploadPage;
