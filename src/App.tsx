import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (produtosCarrinho.length > 0) {
      localStorage.setItem('produtos', JSON.stringify(produtosCarrinho));
    }
  }, [produtosCarrinho]);

  const handleClickAdicionar = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const acumularObjeto = {
      id: target.id,
      title: target.title,
      price: target.name,
      quantity: 1,
    };

    if (!produtosCarrinho.some((produto) => produto.id === target.id)) {
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
  };

  return (
    <Routes>
      <Route
        element={ <Home
          handle={ (event:
          React.MouseEvent<HTMLButtonElement>) => handleClickAdicionar(event) }
        /> }
        path="/"
      />
      <Route
        element={ <Carrinho /> }
        path="/cart"
      />
      <Route
        element={ <Description
          handleClickAdicionar={ (event:
          React.MouseEvent<HTMLButtonElement>) => handleClickAdicionar(event) }
        /> }
        path="/description/:id"
      />
    </Routes>
  );
}

export default App;
