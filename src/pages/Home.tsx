import { useState } from 'react';
import { Link } from 'react-router-dom';
import BuscarCategorias from '../components/BuscarCategorias';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsList } from '../components/ProductsList';

interface HomeProps {
  handle: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Home({ handle }: HomeProps) {
  const [search, setSearch] = useState('');
  const [infoProducts, setInfoProducts] = useState([]);
  const [show, setShow] = useState(true);
  const [showProducts, setShowProducts] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleClick = async () => {
    const data = await getProductsFromCategoryAndQuery('', search);
    setInfoProducts(data.results);
    if (search !== '')setShow(false);
    if (data.results.length === 0) setShowProducts(false);
  };

  return (
    <div>
      <input
        type="text"
        onChange={ handleChange }
        value={ search }
        data-testid="query-input"
      />
      <button
        onClick={ handleClick }
        data-testid="query-button"
      >
        Pesquisar

      </button>
      {show && (
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>)}
      <BuscarCategorias
        handle={ (event:
        React.MouseEvent<HTMLButtonElement>) => handle(event) }
      />

      <Link to="/cart" data-testid="shopping-cart-button ">
        <button>carrinho</button>
      </Link>
      <div>
        {showProducts ? infoProducts.map(({ id, title, thumbnail, price }) => (
          <div key={ id }>
            <ProductsList
              id={ id }
              title={ title }
              thumbnail={ thumbnail }
              price={ price }
            />
            <button
              id={ id }
              title={ title }
              name={ price }
              data-testid="product-add-to-cart"
              onClick={ (event) => handle(event) }
            >
              Adicionar ao carrinho

            </button>
          </div>
        )) : <p>Nenhum produto foi encontrado</p>}

      </div>

    </div>
  );
}
