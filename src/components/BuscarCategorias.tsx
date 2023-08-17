import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';

function BuscarCategorias() {
  const [valorCategorias, setValorCategorias] = useState([]);

  useEffect(() => {
    const recebeCategorias = async () => {
      const recebeGet = await getCategories();
      setValorCategorias(recebeGet);
    };
    recebeCategorias();
  }, []);
  console.log(valorCategorias);

  return (
    <>
      {valorCategorias.map((e:any) => {
        return (
          <label data-testid="category" key={ e.id }>
            <input type="radio" name="categorias" />
            {e.name}

          </label>
        );
      })}
    </>
  );
}

export default BuscarCategorias;
