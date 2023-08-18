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
    if (!produtosCarrinho.some((produto) => produto.id === target.id)) {
      const acumularObjeto = {
        id: target.id,
        title: target.title,
        price: target.name,
        quantity: 1,
      };

      setProdutosCarrinho([
        ...produtosCarrinho,
        acumularObjeto,
      ]);
    } else {
      const newCarrinho = produtosCarrinho
        .map((productPlus) => (productPlus.id === target.id
          ? { ...productPlus, quantity: productPlus.quantity + 1 } : productPlus));
      setProdutosCarrinho([
        ...newCarrinho,
      ]);
    }
    localStorage.setItem(
      'produtos',
      JSON.stringify(produtosCarrinho),
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
