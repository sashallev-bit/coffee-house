const { MenuRepository } = require("./data/Repo");
const { headerBind, asideBind } = require("./HeaderNavigation");



const repo = new MenuRepository();

const menuRadio = document.querySelectorAll('input[name="menu"]');
const menuListProgress = document.querySelector('.menu-list_progress');


let categoryProductMenu = document.querySelector('input[name="menu"]:checked').value;
const list = document.querySelector('.menu-list');
let perPageColumnMenu = Infinity;
let perPagePositionMenu = 0;
let finishFlag = false;


menuRadio.forEach(radio => {
  radio.addEventListener('change', async (event) => {
    categoryProductMenu = event.target.value;
    console.log(categoryProductMenu);
    await renderMenu();
  })
})

window.addEventListener ('resize', () => {
  if(window.innerWidth <= 768) {
    
    menuListProgress.classList.toggle('active', !finishFlag);
    perPageColumnMenu = 4;
  } 

  if(window.innerWidth > 768) {
    menuListProgress.classList.toggle('active', false);
    perPageColumnMenu = Infinity;
    if(!finishFlag) addPerPageCards(perPageColumnMenu);
  }

})

document.querySelector('.progress-menu-list').addEventListener('click', () => {
  addPerPageCards(perPageColumnMenu);
});

async function renderMenu() {
  
  list.querySelectorAll('.menu-list_item').forEach(element => {
    element.remove();    
  });

  perPagePositionMenu = 0;

  if (window.innerWidth <= 768) {
    perPageColumnMenu = 4;
  }

  await addPerPageCards(perPageColumnMenu);
}

async function addPerPageCards(perPageColumn) {
    
  const node = await repo.getProducts(categoryProductMenu, perPagePositionMenu, perPageColumn)
  const cards = await Promise.all(node.data.map(renderCart));
  let fragment = document.createDocumentFragment();
  cards.forEach(element => {
    console.log('in cards');
    let listItem = document.createElement('li');
    listItem.classList.add('menu-list_item');
    listItem.appendChild(element);
    fragment.appendChild(listItem);
  });

  perPagePositionMenu += perPageColumnMenu;
  list.insertBefore(fragment, menuListProgress);
  console.log('in add',list);
  finishFlag = Boolean(node.finishFlag);
  menuListProgress.classList.toggle('active', !finishFlag);
}

async function renderCart(product) {
  const fragment = document.createDocumentFragment();
  let nameProduct, descriptionProduct, imageProduct, descriptionContainer, 
  priceContainer, currency, priceProduct = null;
  imageProduct = document.createElement('div');
  descriptionContainer = document.createElement('div');
  nameProduct = document.createElement('h3');
  descriptionProduct = document.createElement('p');
  priceContainer = document.createElement('div');
  currency = document.createElement('span');
  priceProduct = document.createElement('span');

  imageProduct.classList.add('image');
  descriptionContainer.classList.add('description');
  priceContainer.classList.add('price-wrapper');
  priceProduct.classList.add('price');
          
  nameProduct.textContent = product.name;
  descriptionProduct.textContent = product.description;
  currency.textContent = '$';
  priceProduct.textContent = product.price;

  await setBackground(imageProduct, product.imag);

  descriptionContainer.appendChild(nameProduct);
  descriptionContainer.appendChild(descriptionProduct);
  priceContainer.appendChild(currency);
  priceContainer.appendChild(priceProduct);
  descriptionContainer.appendChild(priceContainer);

  fragment.appendChild(imageProduct);
  fragment.appendChild(descriptionContainer);        
  return fragment;
  
}

async function setBackground(imageProduct, imageUrl) {
  try {
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      imageProduct.style.backgroundImage = `url('${imageUrl}')`;
    };
    
    img.onerror = () => {
      console.error('error load background:', imageUrl);
      element.style.backgroundImage = `url('../assets/icon/ic_coffee-cup')`;
    };
    
  } catch (error) {
     console.log('set err', imageUrl, imageProduct);
  }
}

async function render() {
  await renderMenu();
}

render();

headerBind();
asideBind();