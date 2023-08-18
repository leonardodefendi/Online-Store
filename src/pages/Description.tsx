import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';

import { TypeProduct } from '../types/types';

export function Description() {
  const [productDetails, setProductDetails] = useState<any>({});
  // const [loading, setLoading]
  const { id } = useParams();
  useEffect(() => {
    const response = async () => {
      const data = await getProductById(id as string);
      setProductDetails(data);
    };
    response();
  }, []);
  console.log(productDetails);
  return (
    <>
      <div>
        <p data-testid="product-detail-name">{productDetails.title}</p>
        <img
          src={ `${productDetails.thumbnail}` }
          alt=""
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-price">{productDetails.price}</p>
        {productDetails.attributes && productDetails.attributes.map((detail:any) => (
          <p key={ detail.id }>{detail.value_name}</p>))}
      </div>
      <Link to="/cart">
        <button data-testid="shopping-cart-button">Adicionar ao carrinho</button>
      </Link>
    </>
  );
}
