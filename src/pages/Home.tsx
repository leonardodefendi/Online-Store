import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BsFillCartCheckFill from 'react-icons/bs';
import BuscarCategorias from '../components/BuscarCategorias';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsList } from '../components/ProductsList';
import { HomeContainer, CategoryContainer,
  Input, ButtonSearch, Header, CarrinhoBtn,
  InputContainer, Message, ProductsContainer,
  Product, ProductList } from '../styles/home.styled';

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
      <Header>
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
        </InputContainer>
        <h1>Frontend Online Store</h1>
        <Link to="/cart" data-testid="shopping-cart-button ">
          <CarrinhoBtn>
            Carrinho
          </CarrinhoBtn>
          <p data-testid="shopping-cart-size">
            {quantidade}

          </p>
        </Link>
      </Header>
      {show && (
        <Message data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </Message>)}

      <ProductsContainer>

        <BuscarCategorias
          handle={ (event:
          React.MouseEvent<HTMLButtonElement>) => handle(event) }
        />
        <ProductList>
          {showProducts ? infoProducts.map(({ id, title, thumbnail, price,
            shipping: { free_shipping } }) => (
              <Product key={ id }>
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
              </Product>
          )) : <p>Nenhum produto foi encontrado</p>}
        </ProductList>
      </ProductsContainer>

    </HomeContainer>
  );
}
