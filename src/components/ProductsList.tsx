import { Link } from 'react-router-dom';

type ProductListType = {
  title: string,
  thumbnail:string,
  price:number,
  id:string,
  shipping: boolean,
};

export function ProductsList({ title, thumbnail, price,
  id, shipping }: ProductListType) {
  return (
    <div data-testid="product">
      <Link to={ `/description/${id}` } data-testid="product-detail-link">
        <p>{title}</p>
        <img src={ thumbnail } alt="" />
        <p>
          R$
          {' '}
          {price}
        </p>
        {shipping && <p data-testid="free-shipping">Frete Gratis</p>}
      </Link>
    </div>
  );
}
