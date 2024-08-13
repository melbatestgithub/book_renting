import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  CircularProgress
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Sidebar from '../../components/bookOwner/Sidebar';
import Topbar from '../../components/Topbar';
import smile from '../../assets/smile 1.png';
import axios from 'axios';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BookUploadPage = () => {
  const [book, setBook] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [bookNumber, setBookNumber] = useState('');
  const [openAddBook, setOpenAddBook] = useState(false);
  const [openCongrats, setOpenCongrats] = useState(false);
  const [bookCover, setBookCover] = useState(null);
  const [newBook, setNewBook] = useState({
    bookName: '',
    authorName: '',
    category: '',
  });
  const [bookOptions, setBookOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]); // State for categories
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(false); // State for spinner

  // Fetch book options based on user input
  useEffect(() => {
    const searchBook = async () => {
      try {
        const res = await axios.get('https://book-renting-server-side.onrender.com/book/search', {
          params: { query: book },
        });
        setBookOptions(res.data);
      } catch (error) {
        console.error('Error fetching book options:', error);
      }
    };
    searchBook();
  }, [book]);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://book-renting-server-side.onrender.com/category/get'); // Adjust the endpoint as necessary
        setCategoryOptions(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleBookChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'add') {
      setOpenAddBook(true);
    } else {
      const selectedBook = bookOptions.find((b) => b.book_name === selectedValue);
      setBook(selectedValue);
      setNewBook({
        bookName: selectedBook.book_name,
        authorName: selectedBook.author,
        category: selectedBook.category || '',
      });
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleBookNumberChange = (event) => {
    setBookNumber(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleUploadCover = (event) => {
    setBookCover(event.target.files[0]);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBook = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setSnackbarMessage('User not found. Please log in again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
  
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    const fullName = `${firstName} ${lastName}`;
    console.log('User Full Name:', fullName); // Log fullName to verify
  
    try {
      const response = await axios.post('https://book-renting-server-side.onrender.com/book/addBook', {
        book_name: newBook.bookName,
        author: newBook.authorName,
        category: newBook.category,
        book_owner: fullName,
      });
      setBook(response.data.book_name);
      setOpenAddBook(false);
      setOpenCongrats(true);
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };
  

  const handleClose = () => {
    setOpenAddBook(false);
  };

  const handleCongratsClose = () => {
    setOpenCongrats(false);
  };

  const uploadBookCover = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const firstName = user.firstName;
    const lastName = user.lastName;
    const fullName = `${firstName} ${lastName}`;

    // Validate if all required fields are filled
    if (!book || !quantity || !price || !bookNumber || !bookCover || !newBook.category) {
      setSnackbarMessage('Please fill in all required fields.');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append('bookCover', bookCover);
    formData.append('book_name', newBook.bookName);
    formData.append('author', newBook.authorName);
    formData.append('category', newBook.category);
    formData.append('book_number', bookNumber); // Include book number
    formData.append('quantity', quantity);
    formData.append('book_price', price);
    formData.append('book_owner', fullName);
    setLoading(true); // Show spinner

    try {
      const response = await axios.post('https://book-renting-server-side.onrender.com/book/uploadBook', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book uploaded successfully:', response.data);

      // Show the Congrats modal after successful upload
      setOpenCongrats(true);
      window.location.reload()
    } catch (error) {
      console.error('Error uploading book:', error);
      setSnackbarMessage('Error uploading book. Please try again.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1,backgroundColor: '#f0f2f5' }}>
        <Topbar />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Upload New Book
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%', gap: 2 }}>
            <TextField
              select
              label="Search book by name or Author"
              value={book}
              onChange={handleBookChange}
              fullWidth
              sx={{ marginBottom: 2 }}
              required
            >
              {bookOptions.map((b, index) => (
                <MenuItem key={index} value={b.book_name}>
                  {b.book_name} - {b.author}
                </MenuItem>
              ))}
              <MenuItem value="add">Add</MenuItem>
            </TextField>
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <FormControl fullWidth>
                <InputLabel>Book Quantity</InputLabel>
                <Select
                  value={quantity}
                  onChange={handleQuantityChange}
                  label="Book Quantity"
                  required
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
              <TextField
                label="Book Number"
                value={bookNumber}
                onChange={handleBookNumberChange}
                fullWidth
                required
              />
            </Box>
            <IconButton
              color="primary"
              aria-label="upload book cover"
              component="span"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              onClick={() => document.getElementById('bookCoverInput').click()}
            >
              <UploadFileIcon />
              <Typography>Upload Book Cover</Typography>
              <input
                id="bookCoverInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleUploadCover}
              />
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={uploadBookCover}
              sx={{ width: '100%', mt: 2 }}
            >
             {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Box>
          <Dialog open={openAddBook} onClose={handleClose}>
            <DialogTitle sx={{ textAlign: 'center' }}>Add Book</DialogTitle>
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
                required
              />
              <TextField
                margin="dense"
                name="authorName"
                label="Author Name"
                type="text"
                fullWidth
                value={newBook.authorName}
                onChange={handleModalChange}
                required
              />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newBook.category}
                  onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                  label="Category"
                  required
                >
                  {categoryOptions.map((cat, index) => (
                    <MenuItem key={index} value={cat.name}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button onClick={handleAddBook} color="primary" sx={{ background: '#00ABFF', margin: '1rem 4rem', padding: '.8rem 1rem', color: 'white' }}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openCongrats} onClose={handleCongratsClose}>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Congrats!
              </Typography>
              <img src={smile} alt="Smile" style={{ width: '100px', height: '100px' }} />
              <Typography variant="body1" sx={{ mt: 2 }}>
                Your book has been successfully uploaded!
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCongratsClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};

export default BookUploadPage;
