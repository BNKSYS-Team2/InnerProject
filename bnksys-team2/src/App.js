import './App.css';
import { Routing } from './pages/Routing.jsx';
import React, { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routing />
    </div>
  );
}

export default App;
