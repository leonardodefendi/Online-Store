type ProductListType = {
  title: string,
  thumbnail:string,
  price:number
};

export function ProductsList({ title, thumbnail, price }: ProductListType) {
  return (
    <div data-testid="product">
      <p>{title}</p>
      <img src={ thumbnail } alt="" />
      <p>
        R$
        {' '}
        {price}
      </p>
    </div>
  );
}
