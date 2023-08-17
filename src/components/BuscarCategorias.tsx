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

  return (
    <div>BuscarCategorias</div>
  );
}

export default BuscarCategorias;
