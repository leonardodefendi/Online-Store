import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import Carrinho from './pages/Carrinho';
import { Description } from './pages/Description';

type ProdutosType = {
  title:string,
  price: string,
  id : string,
  quantity: number,
};

function App() {
  const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutosType[]>([]);

  const handleClickAdicionar = ({ target }) => {
    const acumularObjeto = { // find
      id: target.id,
      title: target.title,
      price: target.name,
      quantity: 1,
    };

    // caso find retorne algo, preciso do map (if conferindo id)

    // setProdutosCarrinho([
    //   ...produtosCarrinho,
    //   acumularObjeto,
    // ]);

    if (produtosCarrinho.find((i) => i.id !== target.id)) {
      setProdutosCarrinho([
        ...produtosCarrinho,
        acumularObjeto,
      ]);
    } else {
      produtosCarrinho
        .map((e) => e.id === target.id && { ...e, quantity: e.quantity + 1 });
    }

    console.log(produtosCarrinho);

    // .reduce((acc: ProdutosType[], cur) => {
    //   if (!acc.some((i: ProdutosType) => i.id === cur.id)) {
    //     acc.push({
    //       ...cur,
    //       quantity:,
    //     });
    //   }
    //   return acc;
    // }, []);

    // console.log(acumularObjeto);

    localStorage.setItem(
      'produtos',
      JSON.stringify([
        ...produtosCarrinho,
        acumularObjeto,
      ]),
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
