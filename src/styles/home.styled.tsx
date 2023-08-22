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
  width: 100%;
  margin-top: 30px;
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
height: 30px;
justify-self: flex-end;
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
  width: 13%;
  height: 13%;
  justify-content: space-between;
  padding: 15px;
`;
export const ProductList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 70%;
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
