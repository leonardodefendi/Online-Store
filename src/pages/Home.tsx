import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BuscarCategorias from '../components/BuscarCategorias';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsList } from '../components/ProductsList';
import { HomeContainer, CategoryContainer,
  Input, ButtonSearch, InputContainer, CarrinhoBtn } from '../styles/home.styled';

type ProdutosType = {
  title:string,
  price: string,
  id : string,
  quantity: number,
};

interface HomeProps {
  handle: (event: React.MouseEvent<HTMLButtonElement>) => void;
  quantidade: number | undefined;
}

export function Home({ handle, quantidade }: HomeProps) {
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
    console.log(data);
    setInfoProducts(data.results);
    if (search !== '')setShow(false);
    if (data.results.length === 0) setShowProducts(false);
  };

  return (
    <HomeContainer>
      <InputContainer>
        <Input
          type="text"
          onChange={ handleChange }
          value={ search }
          data-testid="query-input"
        />
        <ButtonSearch
          onClick={ handleClick }
          data-testid="query-button"
        >
          Pesquisar

        </ButtonSearch>
        <Link to="/cart" data-testid="shopping-cart-button ">
          <CarrinhoBtn>Carrinho</CarrinhoBtn>
        </Link>
      </InputContainer>
      {show && (
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>)}

      <p data-testid="shopping-cart-size">
        {quantidade}

      </p>
      <CategoryContainer>
        <BuscarCategorias
          handle={ (event:
          React.MouseEvent<HTMLButtonElement>) => handle(event) }
        />
      </CategoryContainer>

      <div>
        {showProducts ? infoProducts.map(({ id, title, thumbnail, price,
          shipping: { free_shipping } }) => (
            <div key={ id }>
              <ProductsList
                id={ id }
                title={ title }
                thumbnail={ thumbnail }
                price={ price }
                shipping={ free_shipping }
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

    </HomeContainer>
  );
}
