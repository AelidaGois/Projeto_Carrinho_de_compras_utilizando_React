const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
    it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', async () => {
        saveCartItems('<ol><li>Item</li></ol>');
        const local = localStorage.setItem;
        expect(local).toBeCalled();
    });
    it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro `cartItems` e o segundo sendo o valor passado como argumento para saveCartItems', () => {
        saveCartItems('<ol><li>Item</li></ol>');
        const l = localStorage.setItem;
        expect(l).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
    });
});
