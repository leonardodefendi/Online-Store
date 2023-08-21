import { useState, useEffect } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsList } from './ProductsList';
import { Category } from '../styles/buscarcategorias.styled';

function BuscarCategorias({ handle }: any) {
  const [valorCategorias, setValorCategorias] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const recebeCategorias = async () => {
      const recebeGet = await getCategories();
      setValorCategorias(recebeGet);
    };
    recebeCategorias();
  }, []);

  const handleClick = async (e: string) => {
    const eachCategory = await getProductsFromCategoryAndQuery(e);
    setCategories(eachCategory.results);
  };

  return (
    <>
      {valorCategorias.map((e:any) => (
        <Category key={ e.id }>
          <label
            data-testid="category"

          >
            <input
              type="radio"
              name="categorias"
              onClick={ () => handleClick(e.id) }
            />
            {e.name}
          </label>
        </Category>
      ))}
      {categories.map(({ id, title, thumbnail, price, shipping: { free_shipping } }) => (
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
      ))}
    </>
  );
}

export default BuscarCategorias;
