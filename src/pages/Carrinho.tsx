import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type ProdutosType = {
  title:string,
  price: string,
  id : string,
  quantity: number,
};

function Carrinho() {
  const [localStorageProduct, setLocalStoargeProduct] = useState<ProdutosType[]>();
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    const storage = localStorage.getItem('produtos');
    if (storage) {
      const jsonResponse = JSON.parse(storage);
      const reduce: ProdutosType = jsonResponse.reduce((acc, curr) => {
        const filtred = acc.filter(({ id }) => id === curr.id).length + 1;
        const count = filtred;
        // const obj = {
        //   [curr.id]: acc.filter(({ id }) => id === curr.id).length,
        // };
        if (!acc.some((i) => i.id === curr.id)) {
          acc.push({ title: curr.title,
            price: curr.price,
            id: curr.id,
            quantity: count });
        }
        return acc;
      }, []);
      console.log(reduce);
      setLocalStoargeProduct(reduce);
    }
  }, []);

  const handleClick = ({ target }) => {
    if (target.name === 'sub') {
      setProduct({
        ...product,
        [target.id]: target,
      });
    }
  };
  return (
    <main>
      <Link to="/"><button>Home</button></Link>
      <div>
        <h1>Carrinho de compras</h1>
        {localStorageProduct && localStorageProduct.length === 0
        && <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>}
      </div>
      <div>
        {localStorageProduct && localStorageProduct.map((e, index) => (
          <div key={ index }>
            <h2 data-testid="shopping-cart-product-name">{e.title}</h2>
            <img src="" alt="" />
            <p>{e.price}</p>
            <p data-testid="shopping-cart-product-quantity">{e.quantity}</p>
            <button
              name="sub"
              id={ e.id }
              onClick={ handleClick }
            >
              -
            </button>
            <button
              name="sum"
              id={ e.id }
              onClick={ handleClick }
            >
              +
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Carrinho;
