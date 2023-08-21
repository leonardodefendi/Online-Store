import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from 'styled-components';
import { FiMoon } from 'react-icons/fi';
import { BsLightningCharge } from 'react-icons/bs';
import { Home } from './pages/Home';
import Carrinho from './pages/Carrinho';
import { Description } from './pages/Description';
import Checkout from './pages/Checkout';
import dark from './styles/themes/dark';
import ligth from './styles/themes/light';
import GlobalStyles from './styles/global';

type ProdutosType = {
  title:string,
  price: string,
  id : string,
  quantity: number,
};

function App() {
  const [produtosCarrinho, setProdutosCarrinho] = useState<ProdutosType[]>([]);
  const [quantidade, setQuantidade] = useState<number>();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [theme, setTheme] = useState<boolean>(false);

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

  const toggleTheme = () => {
    setTheme(!theme);
    setIsDarkTheme((prevState) => !prevState);
  };

  return (
    <ThemeProvider theme={ isDarkTheme ? dark : ligth }>
      <GlobalStyles />
      <button onClick={ toggleTheme }>
        {!theme ? <FiMoon /> : <BsLightningCharge />}
      </button>
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
    </ThemeProvider>
  );
}

export default App;
