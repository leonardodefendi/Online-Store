import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type ProdutosType = {
  title:string,
  price: string,
  id : string,
  quantity: number,
};

function Carrinho() {
  const [localStorageProducts, setLocalStorageProducts] = useState<ProdutosType[]>([]);

  const getLocalStorage = localStorage.getItem('produtos');
  const locaStorageExist = getLocalStorage && JSON.parse(getLocalStorage);

  useEffect(() => {
    if (localStorage.length) {
      const storage = localStorage.getItem('produtos');
      const parse: ProdutosType[] = JSON.parse(storage as string);
      setLocalStorageProducts(parse);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    if (target.name === 'sum') {
      const newStorage = localStorageProducts
        .map((addProduct) => (addProduct.id === target.id
          ? { ...addProduct, quantity: addProduct.quantity + 1 } : addProduct));
      setLocalStorageProducts([
        ...newStorage,
      ]);
      localStorage.setItem(
        'produtos',
        JSON.stringify(newStorage),
      );
    }

    if (target.name === 'sub') {
      const newStorage = localStorageProducts
        .map((addProduct) => (addProduct.id === target.id
          ? { ...addProduct,
            quantity: (addProduct.quantity > 1 ? addProduct.quantity - 1 : 1) as number }
          : addProduct));
      setLocalStorageProducts([
        ...newStorage,
      ]);
      localStorage.setItem(
        'produtos',
        JSON.stringify(newStorage),
      );
    }

    if (target.name === 'remove') {
      const newStorage = localStorageProducts
        .filter((removeProduct) => removeProduct.id !== target.id);
      setLocalStorageProducts([
        ...newStorage,
      ]);
      localStorage.setItem(
        'produtos',
        JSON.stringify(newStorage),
      );
    }
  };

  return (
    <main>
      <Link to="/"><button>Home</button></Link>
      <div>
        <h1>Carrinho de compras</h1>
        {!locaStorageExist
        && <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>}
      </div>
      <div>
        {localStorageProducts && localStorageProducts.map((e) => (
          <div key={ e.id }>
            <button
              data-testid="remove-product"
              id={ e.id }
              name="remove"
              onClick={ handleClick }
            >
              Remover
            </button>
            <h2 data-testid="shopping-cart-product-name">{e.title}</h2>
            <img src="" alt="" />
            <p>{e.price}</p>
            <p data-testid="shopping-cart-product-quantity">{e.quantity}</p>
            <button
              data-testid="product-decrease-quantity"
              id={ e.id }
              name="sub"
              onClick={ handleClick }
            >
              -
            </button>
            <button
              data-testid="product-increase-quantity"
              id={ e.id }
              name="sum"
              onClick={ handleClick }
            >
              +
            </button>
          </div>
        ))}
        <Link
          to="/checkout"
          data-testid="checkout-products"
        >
          <button>Finalizar compra</button>

        </Link>
      </div>
    </main>
  );
}

export default Carrinho;
