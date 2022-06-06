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
  it('Teste se o retorno da função `fetchProducts` com o argumento `computador` é uma estrutura de dados igual ao objeto computadorSearch', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função `fetchProducts` sem argumento, retorna um erro com a mensagem: `You must provide an url`', async () => {
    expect(() => {
      fetchProducts();
    }).toThrow('You must provide an url');
  });


});
