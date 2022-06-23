let valorTotal = 0;
const createTotalProducts = document.createElement('p');

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

async function Products(computador) {
  const div = document.createElement('div');
    div.className = 'loading';
    div.innerHTML = 'carregando...';
    document.querySelector('.items').appendChild(div);
  const resposta = await fetchProducts(computador);
  document.querySelector('.loading').remove();
  resposta.results.forEach((item) => createProductItemElement(item));
}Products();

function appendItems(objeto) {
  // adiciona Item como filho de Items.
  const items = document.querySelector('.items');
  // buscando a classe 'items'.
  items.appendChild(createProductItemElement(objeto));
  // pegando o retorno de createProductItemElement e colocando como filho de 'Items'.
}

const getCartItems = () => document.querySelector('.cart__items');

const itemsLocalStorage = () => {
  const arrayItem = [];
  const cartItem = getCartItems().childNodes;
  cartItem.forEach((element) => {
    arrayItem.push(element.innerText);
  });
  return JSON.stringify(arrayItem);
};

const createElementSum = (price) => {
  const getCart = document.querySelector('.cart');
  createTotalProducts.className = 'total-price';
  createTotalProducts.innerText = price;
  getCart.appendChild(createTotalProducts);
};

const getSum = (price) => {
  valorTotal += parseFloat(price);
  createElementSum(valorTotal);
};

const getSubtraction = (price) => {
  valorTotal -= parseFloat(price);
  createElementSum(valorTotal);
};

const cartItemClickListener = async (event) => {
  event.target.remove();
  const valueProduct = parseFloat(event.target.innerText.split('$')[1]);
  getSubtraction(valueProduct);
};

const esvaziarCarrinho = () => {
  const getEmptyCart = document.querySelector('.empty-cart');
  const getCartItems2 = document.querySelector('.cart__items');
  getEmptyCart.addEventListener('click', () => {
    localStorage.clear();
    getCartItems2.innerText = '';
    createTotalProducts.innerText = 0;
  });
};
esvaziarCarrinho();

const transformarParaArray = () => {
  const savedCart = getSavedCartItems();
  if (savedCart) {
    const returnArray = JSON.parse(savedCart);
    const cartItems = getCartItems();
    returnArray.forEach((arr) => {
      const createLi = document.createElement('li');
      createLi.className = 'cart__item';
      createLi.innerText = arr;
      cartItems.appendChild(createLi);
      createLi.addEventListener('click', cartItemClickListener);
    });
  }
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const adicionarProdutoCart = async (product) => {
  const itemFetch = await fetchItem(product);
  const { id, title, price } = itemFetch;
  const obj = { sku: id, name: title, salePrice: price };
  const elementLi = createCartItemElement(obj);
  getCartItems().appendChild(elementLi);
  saveCartItems(itemsLocalStorage());
  getSum(obj.salePrice);
};

const getbuttons = () => {
  const buttons = document.getElementsByClassName('item__add');

  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', (event) => {
      const getId = event.target.parentNode.firstChild.innerText;
      adicionarProdutoCart(getId);
    });
  }
};

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
  getbuttons();
  // ela percorreu todo o array de Produtos e chamou a função AppendItems adicionando cada produto como parâmetro da função.
} adicionaItems();

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;
transformarParaArray();
window.onload = {};
