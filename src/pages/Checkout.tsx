import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ProdutosType = {
  title:string,
  price: string,
  id : string,
  quantity: number,
};
const initialValues = {
  name: '',
  email: '',
  cpf: '',
  phone: '',
  cep: '',
  address: '',
  payment: '',
};
type FormType = {
  name: string,
  email: string,
  cpf: string,
  phone: string,
  cep: string,
  address: string,
  payment: string,
};

function Checkout() {
  const [recoveryProducts, setRecoveryProducts] = useState<ProdutosType[]>([]);
  const [formValues, setFormValues] = useState<FormType>(initialValues);
  const [finish, setFinish] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const response = localStorage.getItem('produtos');
    if (response) {
      const parse: ProdutosType[] = JSON.parse(response);
      setRecoveryProducts(parse);
    }
  }, []);

  const handleChange = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value } = event.target;
    setFormValues(
      {
        ...formValues,
        [name]: value,
      },
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const arrayValues = Object.values(formValues);
    if (arrayValues.every((item) => item !== '')) {
      navigate('/cart');
      console.log('entrou');
      localStorage.removeItem('produtos');
    } else {
      setFinish(false);
    }
  };

  return (
    <>
      <div>
        <h2>Revise seus produtos</h2>
        {recoveryProducts.length > 0 && recoveryProducts.map((item:any) => (
          <div key={ item.id }>
            <p>{item.title}</p>
            <p>
              <span>Quantidade: </span>
              {item.quantity}
            </p>
            <p>
              <span>Valor: </span>
              R$
              {(item.price) * (item.quantity)}
            </p>
          </div>
        ))}
      </div>
      <form action="">
        <label htmlFor="">
          Nome Completo:
          <input
            type="text"
            data-testid="checkout-fullname"
            name="name"
            value={ formValues.name }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="">
          Email:
          <input
            type="email"
            data-testid="checkout-email"
            name="email"
            value={ formValues.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="">
          CPF:
          <input
            type="text"
            data-testid="checkout-cpf"
            name="cpf"
            value={ formValues.cpf }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="">
          Telefone:
          <input
            type="text"
            data-testid="checkout-phone"
            name="phone"
            value={ formValues.phone }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="">
          CEP:
          <input
            type="text"
            data-testid="checkout-cep"
            name="cep"
            value={ formValues.cep }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="">
          Endereço:
          <input
            type="text"
            data-testid="checkout-address"
            name="address"
            value={ formValues.address }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="">
          Boleto
          <input
            type="radio"
            data-testid="ticket-payment"
            name="payment"
            onChange={ handleChange }
            value="Boleto"
          />
        </label>
        <label htmlFor="">
          Visa
          <input
            type="radio"
            data-testid="visa-payment"
            name="payment"
            onChange={ handleChange }
            value="Visa"
          />
        </label>
        <label htmlFor="">
          MasterCard
          <input
            type="radio"
            data-testid="master-payment"
            name="payment"
            onChange={ handleChange }
            value="MasterCard"
          />
        </label>
        <label htmlFor="">
          Elo
          <input
            type="radio"
            data-testid="elo-payment"
            name="payment"
            onChange={ handleChange }
            value="Elo"
          />
        </label>
        <button
          data-testid="checkout-btn"
          onClick={ handleClick }
        >
          Finalizar

        </button>
      </form>
      {!finish && <h3 data-testid="error-msg">Campos inválidos</h3>}
    </>

  );
}

export default Checkout;
