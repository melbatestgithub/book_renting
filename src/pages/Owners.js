import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Switch, IconButton, Button, Modal, Grid, TextField, TablePagination,
  CircularProgress
} from '@mui/material';
import { Visibility, Delete, Search, FilterList, Sort, Refresh, Settings, CheckCircle } from '@mui/icons-material';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import axios from 'axios';

const Owners = () => {
  const [owners, setOwners] = useState([]);
  const [filteredOwners, setFilteredOwners] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState({
    email: '',
   address:""

  });

  useEffect(() => {
    const getBookOwners = async () => {
      try {
        const res = await axios.get("https://book-renting-server-side.onrender.com/book-owner/getAll");
        setOwners(res.data);
        setFilteredOwners(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBookOwners();
  }, []);

  useEffect(() => {
    const filterOwners = () => {
      const filtered = owners.filter(owner => {
        const matchesName = `${owner.firstName} ${owner.lastName}`.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEmail = filter.email ? owner.email.toLowerCase().includes(filter.email.toLowerCase()) : true;
        const matchesLocation = filter.address ? owner.address.toLowerCase().includes(filter.address.toLowerCase()) : true;
        return matchesName && matchesEmail && matchesLocation 
      });
      setFilteredOwners(filtered);
    };

    filterOwners();
  }, [searchQuery, filter, owners]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  const handleFilterSubmit = () => {
    setOpenFilterModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSearchBox = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchQuery('');
    }
  };

  const handleView = (owner) => {
    setSelectedOwner(owner);
    setOpenViewModal(true);
  };

  const handleDelete = (owner) => {
    setSelectedOwner(owner);
    setOpenDeleteModal(true);
  };

  const handleApprove = async (userId) => {
    try {
      await axios.put(`https://book-renting-server-side.onrender.com/book-owner/approve/${userId}`);
      setOwners((prevOwners) =>
        prevOwners.map((owner) =>
          owner.id === userId ? { ...owner, approved: true } : owner
        )
      );
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`https://book-renting-server-side.onrender.com/book-owner/delete/${selectedOwner.id}`);
      setOwners((prevOwners) => prevOwners.filter((owner) => owner.id !== selectedOwner.id));
      setOpenDeleteModal(false);
    } catch (error) {
      console.error('Error deleting owner:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1,backgroundColor: '#f0f2f5' }}>
        <Topbar />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>List of Owners</Typography>

          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
            <IconButton onClick={toggleSearchBox}>
              <Search />
            </IconButton>
            {searchVisible && (
              <TextField
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name"
                variant="outlined"
                size="small"
                sx={{ ml: 2 }}
              />
            )}
            <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
              <IconButton onClick={() => setOpenFilterModal(true)}>
                <FilterList />
              </IconButton>
              <IconButton><Refresh /></IconButton>
            </Box>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
              <CircularProgress />
            </Box>
          ) : (
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
                    {filteredOwners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((owner, index) => (
                      <TableRow key={owner.id}>
                        <TableCell>{String(index + 1 + page * rowsPerPage).padStart(2, '0')}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <img
                              src="https://via.placeholder.com/40"
                              alt="Owner"
                              style={{ borderRadius: '50%', marginRight: '10px' }}
                            />
                            {owner.firstName} {owner.lastName}
                          </Box>
                        </TableCell>
                        <TableCell>{`${owner.total_upload} Books`}</TableCell>
                        <TableCell>{owner.address || 'N/A'}</TableCell>
                        <TableCell>
                          {owner.approved ? "Active" : "Inactive"} 
                          <Switch
                            checked={owner.approved || false}
                            checkedIcon={<CheckCircle sx={{ color: '#006400' }} />}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleView(owner)}>
                            <Visibility sx={{ color: "#000000" }} />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(owner)}>
                            <Delete sx={{ color: "#FF0000" }} />
                          </IconButton>
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: owner.approved ? "#00ABFF" : "#AFAFAF",
                              color: owner.approved ? "#fff" : "#000"
                            }}
                            onClick={() => handleApprove(owner.id)}
                          >
                            {owner.approved ? 'Approved' : 'Approve'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Pagination Component */}
              <TablePagination
                component="div"
                count={filteredOwners.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          )}

          {/* View Modal */}
          {selectedOwner && (
            <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
              <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" gutterBottom>View Owner</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography><strong>Name:</strong> {selectedOwner.firstName} {selectedOwner.lastName}</Typography>
                  <Typography><strong>Email:</strong> {selectedOwner.email}</Typography>
                  <Typography><strong>Role:</strong> {selectedOwner.role}</Typography>
                  <Typography><strong>Address:</strong> {selectedOwner.address || 'N/A'}</Typography>
                  <Typography><strong>Total Uploads:</strong> {selectedOwner.total_upload}</Typography>
                </Box>
              </Box>
            </Modal>
          )}

          {/* Delete Modal */}
          {selectedOwner && (
            <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
              <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" gutterBottom>Confirm Delete</Typography>
                <Typography>Are you sure you want to delete {selectedOwner.firstName} {selectedOwner.lastName}?</Typography>
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="primary" onClick={handleDeleteConfirm}>Delete</Button>
                  <Button variant="outlined" color="secondary" onClick={() => setOpenDeleteModal(false)} sx={{ ml: 2 }}>Cancel</Button>
                </Box>
              </Box>
            </Modal>
          )}

          {/* Filter Modal */}
          <Modal open={openFilterModal} onClose={() => setOpenFilterModal(false)}>
            <Box sx={{ ...modalStyle }}>
              <Typography variant="h6" gutterBottom>Filter Owners</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    value={filter.email}
                    onChange={handleFilterChange}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    name="role"
                    label="Role"
                    variant="outlined"
                    fullWidth
                    value={filter.role}
                    onChange={handleFilterChange}
                  />
                </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    name="approved"
                    label="Approved (true/false)"
                    variant="outlined"
                    fullWidth
                    value={filter.approved}
                    onChange={handleFilterChange}
                  />
                </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    name="status"
                    label="Status (active/inactive)"
                    variant="outlined"
                    fullWidth
                    value={filter.status}
                    onChange={handleFilterChange}
                  />
                </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    name="minUploads"
                    label="Min Uploads"
                    variant="outlined"
                    fullWidth
                    value={filter.minUploads}
                    onChange={handleFilterChange}
                  />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="address"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    value={filter.address}
                    onChange={handleFilterChange}
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleFilterSubmit}>Apply</Button>
                <Button variant="outlined" color="secondary" onClick={() => setOpenFilterModal(false)} sx={{ ml: 2 }}>Cancel</Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default Owners;
