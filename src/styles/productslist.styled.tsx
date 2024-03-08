import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductCard = styled(Link)`
  display: flex;
  width: 100%;
  flex-direction: column;
  color: black;
  text-decoration: none;

  .header-product {
    margin-bottom: 30px;
  }
    img{
      width: 90%;
    }
  p{
    width: ;
  }
  .price-product {
    font-weight: 700;
  }
`;

export const ShippingFree = styled.p`
  background: rgba(0, 59, 229, 1);
  width: 100%;
  color: whitesmoke;
  align-self: center;
  justify-self: flex-end;
  margin-top: 10px;
  border-radius: 4px;
  text-align: center;
`;
