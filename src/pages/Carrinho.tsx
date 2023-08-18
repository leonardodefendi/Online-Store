type ProdutosType = {
  produtos :{
    title:string,
    price: string,
    id : string,
  }[]
};

function Carrinho({ produtos }: ProdutosType) {
  return (
    <main>
      <div>
        <h1>Carrinho de compras</h1>
        {produtos.length === 0
        && <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>}
      </div>
      <div>
        {produtos.length > 0
        && produtos.map((e) => (
          <div key={ e.id }>
            <h2 data-testid="shopping-cart-product-name">{e.title}</h2>
            <img src="" alt="" />
            <p>{e.price}</p>
            <p data-testid="shopping-cart-product-quantity">1</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Carrinho;
