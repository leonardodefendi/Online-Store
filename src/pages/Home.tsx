import { useState } from 'react';

export function Home() {
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState('');
  // useEffect(() => {
  //   const response = async () => {
  //     const data = await getProductsFromCategoryAndQuery(search);
  //     if (data.query !== '') {
  //       setShow(false);
  //     }
  //   };
  //   response();
  // }, [search]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
  };
  return (
    <div>
      <input type="text" onChange={ handleChange } value={ search } />
      {show && (
        <h2 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h2>)}

    </div>
  );
}
