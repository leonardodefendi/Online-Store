import { Link } from 'react-router-dom';

type ProductListType = {
  title: string,
  thumbnail:string,
  price:number,
  id:string
};

export function ProductsList({ title, thumbnail, price, id }: ProductListType) {
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
      </Link>
    </div>
  );
}
