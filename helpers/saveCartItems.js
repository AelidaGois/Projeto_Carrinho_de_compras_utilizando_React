const saveCartItems = async (e) => {
localStorage.setItem('cartItems', e);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
