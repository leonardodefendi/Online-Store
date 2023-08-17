import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsList } from '../components/ProductsList';

export function Home() {
  const [search, setSearch] = useState('');
  const [infoProducts, setInfoProducts] = useState([]);
  const [show, setShow] = useState(true);
  const [notFoundProduct, setNotFoundProduct] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleClick = async () => {
    const data = await getProductsFromCategoryAndQuery('', search);
    setInfoProducts(data.results);
    setNotFoundProduct(false);
    if (infoProducts) {
      setShow(false);
    } if (infoProducts.length === 0) setNotFoundProduct(true);
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
      <Link to="/cart" data-testid="shopping-cart-button ">
        <button>carrinho</button>
      </Link>
      <div>
        {notFoundProduct && <p>Nenhum produto foi encontrado</p>}
        {infoProducts.map(({ id, title, thumbnail, price }) => (
          <ProductsList
            key={ id }
            title={ title }
            thumbnail={ thumbnail }
            price={ price }
          />
        ))}

      </div>

    </div>
  );
}
