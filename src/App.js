// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import Owners from './pages/Owners';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/owners" element={<Owners />} />
      </Routes>
    </Router>
  );
};

export default App;
