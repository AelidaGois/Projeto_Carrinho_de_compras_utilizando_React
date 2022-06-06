require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Teste se fetchProducts é uma função', async () => {
    const func = await expect(typeof fetchProducts).toBe('function')
  });
  it('Execute a função fetchProducts com o argumento `computador` e teste se fetch foi chamada', async () => {
    fetchProducts('computador');
    const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    await expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it(`Teste se, ao chamar a função 'fetchProducts' com o argumento 'computador', a função fetch utiliza o endpoint 'https://api.mercadolibre.com/sites/MLB/search?q=computador''`, async () => {
    fetchProducts('computador');
    const endPoint = `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
    await expect(fetch).toHaveBeenCalledWith(endPoint);
  });
});
