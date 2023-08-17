import { useState } from 'react';
import { Link } from 'react-router-dom';
import BuscarCategorias from '../components/BuscarCategorias';

export function Home() {
  const [search, setSearch] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };
  return (
    <div>
      <input type="text" onChange={ handleChange } value={ search } />
      <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2>
      <BuscarCategorias />
      <Link to="/cart" data-testid="shopping-cart-button ">
        <button>carrinho</button>
      </Link>

    </div>
  );
}
