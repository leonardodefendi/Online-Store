export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  return response.json();
}

export async function getProductsFromCategoryAndQuery(categoryId = '', query = '') {
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  return response.json();
}

export async function getProductById(productID:string) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productID}`);
  return response.json();
}
