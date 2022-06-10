const getSavedCartItems = () => {
const getItem1 = localStorage.getItem('cartItems');

return getItem1;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
