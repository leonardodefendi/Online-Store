import { useState, useEffect } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { ProductsList } from './ProductsList';

function BuscarCategorias() {
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
        <label
          data-testid="category"
          key={ e.id }
        >
          <input
            type="radio"
            name="categorias"
            onClick={ () => handleClick(e.id) }
          />
          {e.name}
        </label>
      ))}
      {categories.map(({ id, title, thumbnail, price }) => (
        <ProductsList
          key={ id }
          id={ id }
          title={ title }
          thumbnail={ thumbnail }
          price={ price }
        />
      ))}
    </>
  );
}

export default BuscarCategorias;
