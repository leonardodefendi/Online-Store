import React from 'react';
import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { Home } from './pages/Home';

function App() {
  return (
    <Routes>
      <Route element={ <Home /> } path="/" />
    </Routes>
  );
}

export default App;
