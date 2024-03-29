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
  const modifiedThumbnail = `${thumbnail.slice(0, -5)}W${thumbnail.slice(-4)}`;
  return (
    <div data-testid="product">
      <ProductCard to={ `/description/${id}` } data-testid="product-detail-link">
        <img src={ modifiedThumbnail } alt="" />
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
