import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from '../components/Header.jsx';
import MyPM from './PM/MyPM.jsx';
import Login from './User/Login.jsx';
import Distribute from './PM/DistributePM.jsx';
import Create from './PM/CreatePM.tsx';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="mypm" element={<MyPM />} />
        <Route path="distribute" element={<Distribute />} />
        <Route path="create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};
