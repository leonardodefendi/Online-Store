import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/api';
import Reviews from '../components/Reviews';

export function Description({ handleClickAdicionar, quantidade }:any) {
  const [productDetails, setProductDetails] = useState<any>({});

  const { id } = useParams();
  useEffect(() => {
    const response = async () => {
      const data = await getProductById(id as string);
      setProductDetails(data);
    };
    response();
  }, [id]);
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
      {productDetails.length && productDetails.shipping.free_shipping
      && <p data-testid="free-shipping">Frete Gratis</p>}
      <button
        id={ id }
        title={ productDetails.title }
        name={ productDetails.price }
        data-testid="product-detail-add-to-cart"
        onClick={ (event) => handleClickAdicionar(event) }
      >
        Adicionar ao carrinho

      </button>
      <Link to="/cart">
        <button data-testid="shopping-cart-button">Ir para o carrinho</button>
      </Link>
      <p data-testid="shopping-cart-size">
        {quantidade}

      </p>
      <Reviews />
    </>
  );
}
