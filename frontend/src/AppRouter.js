// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login.js';
import Registration from './registration';
import Dashboard from './dashboard.js';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Use the 'element' prop */}
        <Route path="/" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
