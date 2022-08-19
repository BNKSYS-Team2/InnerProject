import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from '../components/Header';
import MyPM from './PM/MyPM';
import Login from './User/Login';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="mypm" element={<MyPM />} />
      </Routes>
    </BrowserRouter>
  );
};
