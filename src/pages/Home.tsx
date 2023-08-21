import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BuscarCategorias from '../components/BuscarCategorias';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsList } from '../components/ProductsList';

type ProdutosType = {
  title:string,
  price: string,
  id : string,
  quantity: number,
};

interface HomeProps {
  handle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  produtosCarrinho: ProdutosType[]
}

export function Home({ handle, produtosCarrinho }: HomeProps) {
  const [search, setSearch] = useState('');
  const [infoProducts, setInfoProducts] = useState([]);
  const [show, setShow] = useState(true);
  const [showProducts, setShowProducts] = useState(true);
  const [recoveryCart, setRecoveryCart] = useState<ProdutosType[]>();
  useEffect(() => {
    setTimeout(() => {
      const response = localStorage.getItem('produtos');
      if (response) {
        const parse: ProdutosType[] = JSON.parse(response);
        setRecoveryCart(parse);
      }
    }, 100);
  }, [produtosCarrinho]);

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
      <Link to="/cart" data-testid="shopping-cart-button ">
        <button>Carrinho</button>
      </Link>
      <p data-testid="shopping-cart-size">
        {recoveryCart && recoveryCart.reduce((acc, curr) => {
          acc += curr.quantity;
          return acc;
        }, 0) }

      </p>
      <BuscarCategorias
        handle={ (event:
        React.MouseEvent<HTMLButtonElement>) => handle(event) }
      />

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
