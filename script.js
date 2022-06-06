const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

function appendItems(objeto) {
  // adiciona Item como filho de Items.
  const items = document.querySelector('.items');
  // buscando a classe 'items'.
  items.appendChild(createProductItemElement(objeto));
  // pegando o retorno de createProductItemElement e colocando como filho de 'Items'.
}

async function adicionaItems() {
  const produtos = (await fetchProducts('computador')).results;
  // vai trazer todos os produtos da API
  const arrayProdutos = produtos.map((produto) => ({
    sku: produto.id,
    name: produto.title,
    image: produto.thumbnail,
  }));
  // transformar em forma de array de objetos e cada objeto representa um produto.
  arrayProdutos.forEach((element) => appendItems(element));
  // ela percorreu todo o array de Produtos e chamou a função AppendItems adicionando cada produto como parâmetro da função.
} adicionaItems();

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

window.onload = () => { };
