import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import Carrinho from './pages/Carrinho';
import { Description } from './pages/Description';

type ProdutosType = {
  produtos :{
    title:string,
    price: string,
    id : string,
  }
};

function App() {
  const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutosType[]>([]);

  const handleClickAdicionar = (event) => {
    const acumularObjeto = {
      id: event.target.id,
      title: event.target.title,
      price: event.target.name };

    setProdutosCarrinho([...produtosCarrinho, acumularObjeto]);
    localStorage.setItem(
      'produtos',
      JSON.stringify([...produtosCarrinho, acumularObjeto]),
    );
  };
  console.log(produtosCarrinho);

  return (
    <Routes>
      <Route
        element={ <Home
          handle={ (event) => handleClickAdicionar(event) }
        /> }
        path="/"
      />
      <Route element={ <Carrinho produtos={ produtosCarrinho } /> } path="/cart" />
      <Route element={ <Description /> } path="/description/:id" />
    </Routes>
  );
}

export default App;
