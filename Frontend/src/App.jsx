import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Auth';
import Car from './screens/Car';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Car />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
