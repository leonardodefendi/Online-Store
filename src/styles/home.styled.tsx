import styled from 'styled-components';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const CategoryContainer = styled.div`
  justify-self: flex-start;
  width: 350px;
  height: 100%;
  margin-left: 10px;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: rgba(0, 59, 229, 1);
  color: rgba(255, 255, 255, 1);
  /* position: fixed; */

  h1 {
    font-size: 30px;
    margin-right:320px;
  }
`;

export const InputContainer = styled.div`
display: flex;
width: 20%;
`;
export const Input = styled.input`
  width: 90%;
  height: 30px;
  margin-left: 10px;
  border: none;
`;
export const ButtonSearch = styled.button`
  width: 30%;
  height: 30px;
  border: none;
  background-color:rgba(49, 194, 141, 1); ;
`;
export const CarrinhoBtn = styled.button`
height: 100px;
justify-self: flex-end;
width: 100px;
background: rgba(0, 59, 229, 1);
border: none;
color: ${(props) => props.theme.colors.primaryText};
  p{
    background-color:white ;
    width: 20px;
    margin-left: 40%;
    border-radius: 100%;
  }
`;
export const Message = styled.h2`
  align-self: center;
`;

export const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 100px;
`;
export const Product = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 20%;
  justify-content: space-between;
  padding: 15px;
  background-color: white;
  margin-bottom: 10px;
  margin-left: 10px;
  -webkit-box-shadow: -9px 4px 17px -9px rgba(148,145,148,1);
    -moz-box-shadow: -9px 4px 17px -9px rgba(148,145,148,1);
    box-shadow: -9px 4px 17px -9px rgba(148,145,148,1);
`;
export const ProductNotFound = styled.h1`
  width: 100%;
  /* align-self: center; */
  margin-left: 34%;
`;
export const ProductList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 80%;
  button{
    background-color:rgba(49, 194, 141, 1);
    color: white;
    height: 40px;
    border: none;
    width: 100%;
    border-radius: 5px;
    -webkit-box-shadow: -9px 4px 17px -9px rgba(148,145,148,1);
    -moz-box-shadow: -9px 4px 17px -9px rgba(148,145,148,1);
    box-shadow: -9px 4px 17px -9px rgba(148,145,148,1);
    cursor: pointer;
;
  }
`;
