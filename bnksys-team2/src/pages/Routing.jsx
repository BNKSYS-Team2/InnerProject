import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './User/Login';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
