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
    quantitaty:number,
  }
};

function App() {
  const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutosType[]>([]);

  const handleClickAdicionar = (event) => {
    const acumularObjeto = {
      id: event.target.id,
      title: event.target.title,
      price: event.target.name,
      quantity: 1,
    };

    setProdutosCarrinho([...produtosCarrinho, acumularObjeto]);
    localStorage.setItem(
      'produtos',
      JSON.stringify([...produtosCarrinho, acumularObjeto]),
    );
  };

  return (
    <Routes>
      <Route
        element={ <Home
          handle={ (event) => handleClickAdicionar(event) }
        /> }
        path="/"
      />
      <Route element={ <Carrinho /> } path="/cart" />
      <Route
        element={ <Description
          handleClickAdicionar={ (event) => handleClickAdicionar(event) }
        /> }
        path="/description/:id"
      />
    </Routes>
  );
}

export default App;
