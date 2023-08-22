import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProductCard = styled(Link)`
  display: flex;
  width: 100%;
  flex-direction: column;
  text-decoration: none;
  color: ${(props) => props.theme.colors.primaryText};
  .header-product {
    margin-bottom: 30px;
  }

`;

export const ShippingFree = styled.p`
  background: rgba(0, 59, 229, 1);
  width: 50%;
  color: whitesmoke;
  align-self: center;
  justify-self: flex-end;
  margin-top: 10px;
  border-radius: 4px;
`;
