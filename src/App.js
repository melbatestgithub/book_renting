import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Owners from './pages/Owners';
import Login from './pages/Login';
import Register from './pages/Register';
import OwnerDashboard from './pages/bookOwner/OwnerDashboard';
import BookUpload from './pages/bookOwner/BookUpload';

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/books" element={<Books />} />
      <Route path="/owners" element={<Owners />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/owner-dashboard" element={<OwnerDashboard />} />
      <Route path="/book-upload" element={<BookUpload />} />
    </Routes>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
