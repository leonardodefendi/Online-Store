import { useState, useEffect } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

function BuscarCategorias() {
  const [valorCategorias, setValorCategorias] = useState([]);
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    const recebeCategorias = async () => {
      const recebeGet = await getCategories();
      setValorCategorias(recebeGet);
    };
    recebeCategorias();
  }, []);

  const handleClick = async (e: string) => {
    const eachCategory = await getProductsFromCategoryAndQuery(e);
    setCategorys(eachCategory.results);
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
      {categorys.map(({ id, title, thumbnail, price }) => (
        <div key={ id } data-testid="product">
          <h2>{title}</h2>
          <img src={ thumbnail } alt="" />
          <p>{price}</p>
        </div>
      ))}
    </>
  );
}

export default BuscarCategorias;
