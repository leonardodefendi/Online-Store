import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import Carrinho from './pages/Carrinho';
import { Description } from './pages/Description';

function App() {
  return (
    <Routes>
      <Route element={ <Home /> } path="/" />
      <Route element={ <Carrinho /> } path="/cart" />
      <Route element={ <Description /> } path="/description/:id" />
    </Routes>
  );
}

export default App;
