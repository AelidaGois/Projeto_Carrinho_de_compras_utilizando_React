const fetchProducts = async (computador) => {
  if (!fetchProducts) {
    throw new Error('You must provide an url');
  }

  try {
    const endPoint = (`https://api.mercadolibre.com/sites/MLB/search?q=${computador}`);
   
    const fetchUrl = await fetch(endPoint);
    const response = await fetchUrl.json();
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
