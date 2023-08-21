import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import Carrinho from './pages/Carrinho';
import { Description } from './pages/Description';
import Checkout from './pages/Checkout';

type ProdutosType = {
  title:string,
  price: string,
  id : string,
  quantity: number,
};

function App() {
  const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutosType[]>([]);
  const [quantidade, setQuantidade] = useState<number>();

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem('produtos') as string);
    if (produtosCarrinho.length === 0 && response && response.length > 0) {
      setProdutosCarrinho(response);
    }
    if (produtosCarrinho.length > 0) {
      localStorage.setItem('produtos', JSON.stringify(produtosCarrinho));
      const data = produtosCarrinho.reduce((acc, curr) => {
        acc += curr.quantity;
        return acc;
      }, 0);
      localStorage.setItem('quantidade', JSON.stringify(data));
      setQuantidade(data);
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
          quantidade={ quantidade }
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
          quantidade={ quantidade }
        /> }
        path="/description/:id"
      />
      <Route element={ <Checkout /> } path="/checkout" />
    </Routes>
  );
}

export default App;
