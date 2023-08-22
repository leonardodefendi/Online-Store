import { Link } from 'react-router-dom';
import { ProductCard, ShippingFree } from '../styles/productslist.styled';

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
      <ProductCard to={ `/description/${id}` } data-testid="product-detail-link">
        <img src={ thumbnail } alt="" />
        <p className="header-product">{title}</p>
        <p className="price-product">
          R$
          {' '}
          {price}
        </p>
        {shipping
         && <ShippingFree data-testid="free-shipping">Frete Gratis</ShippingFree>}
      </ProductCard>
    </div>
  );
}
