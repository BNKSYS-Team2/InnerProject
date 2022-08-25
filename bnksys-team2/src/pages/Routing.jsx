import React, { useState, useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Header from '../components/Header.jsx';
import MyPM from './PM/MyPM.jsx';
import Login from './User/Login.jsx';
import Distribute from './PM/DistributePM.jsx';
import SelectTemplate from './PM/SelectTemplate.jsx';
import CreatePM2 from './PM/CreatePM2.jsx';
import ClientLogin from '../components/User/ClientLogin.jsx';
import DigitalPicture from './PM/DigitalPicture.jsx';

export const Routing = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="mypm" element={<MyPM />} />
        <Route path="distribute" element={<Distribute />} />
        <Route path="select" element={<SelectTemplate />} />
        <Route path="create" element={<CreatePM2 />} />
        <Route path="clientlogin" element={<ClientLogin />} />
        <Route path="digitalpicture" element={<DigitalPicture />} />
        <Route path="mypm" element={<MyPM />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
