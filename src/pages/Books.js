import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Switch,
  IconButton,
  Avatar,
  CircularProgress,
  InputBase,
  Fade
} from '@mui/material';
import {
  Search as SearchIcon,
  ViewList as ViewListIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Header from '../components/Topbar';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false); // Toggle search box visibility
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://book-renting-server-side.onrender.com/book/getAllBook");
        setBooks(res.data);
        setFilteredBooks(res.data); // Set initial filtered books to all books
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  // Filter books based on search term
  useEffect(() => {
    setFilteredBooks(
      books.filter(book =>
        book.book_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.book_owner.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, books]);

  const handleSearchClick = () => {
    setSearchVisible(!searchVisible); // Toggle search box visibility
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px', backgroundColor: '#f0f2f5' }}>
        <Header />
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={6}>
                    <Typography variant="h6">List of Books</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleSearchClick}>
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
                  <TableCell colSpan={7}>
                    <Fade in={searchVisible}>
                      <Paper component="form" style={{ padding: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
                        <InputBase
                          style={{ marginLeft: 8, flex: 1 }}
                          placeholder="Search Books"
                          inputProps={{ 'aria-label': 'search books' }}
                          value={searchTerm}
                          onChange={handleSearchChange}
                        />
                        <IconButton type="button" onClick={() => setSearchTerm('')} aria-label="clear search">
                          <CloseIcon />
                        </IconButton>
                      </Paper>
                    </Fade>
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
                {filteredBooks.map((book, index) => (
                  <TableRow key={book.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={`/static/images/avatar/${index + 1}.jpg`} alt={book.owner} style={{ marginRight: '30px' }} />
                        {book.book_owner}
                      </div>
                    </TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.book_name}</TableCell>
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
        )}
      </div>
    </div>
  );
};

export default Books;
