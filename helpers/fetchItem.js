const fetchItem = async (id) => {
  try {
    const endPointItems = (`https://api.mercadolibre.com/items/${id}`);

    const fetchItems = await fetch(endPointItems);
    const response = await fetchItems.json();
    return response;
  } catch (error) {
    return error;
  }
} 
fetchItem('MLB1341706310');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
