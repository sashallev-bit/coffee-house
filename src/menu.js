const { MenuRepository } = require("./data/Repo");
const { headerBind, asideBind } = require("./HeaderNavigation");



const repo = new MenuRepository();

const menuRadio = document.querySelectorAll('input[name="menu"]');
const menuListProgress = document.querySelector('.menu-list_progress');
const modal = document.querySelector('.modal');
const overlay = modal.querySelector('.modal_overlay');
const body = document.querySelector('body');
const html = document.querySelector('html');


let categoryProductMenu = document.querySelector('input[name="menu"]:checked').value;
const list = document.querySelector('.menu-list');
let perPageColumnMenu = Infinity;
let perPagePositionMenu = 0;
let finishFlag = false;
let currentProduct = null;
let sizeformProductAdd = null;
let additiveFormProductAdd = null;
let scrollPosition = null;




menuRadio.forEach(radio => {
  radio.addEventListener('change', async (event) => {
    categoryProductMenu = event.target.value;
    await renderMenu();
  })
})

overlay.addEventListener('click', (event) => {
  modal.classList.toggle('active');
  toggleScreenScroll(true);
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
    let listItem = document.createElement('li');
    listItem.classList.add('menu-list_item');
    listItem.appendChild(element);
    listItem.addEventListener('click', (event) => openCartForm(listItem));

    fragment.appendChild(listItem);
  });

  perPagePositionMenu += perPageColumnMenu;
  list.insertBefore(fragment, menuListProgress);
  console.log('in add',list);
  finishFlag = Boolean(node.finishFlag);
  menuListProgress.classList.toggle('active', !finishFlag);
}

async function openCartForm(element) {
  const cartForm = document.querySelector('.full-card');
  const cart = await renderFullCart(element);
  cartForm.innerHTML = '';  
  cartForm.appendChild(cart);
  modal.classList.toggle('active', true);
  toggleScreenScroll(false);
}

function toggleScreenScroll(flag) {
 
  flag ? activeScroll() : anactiveScroll();
  
  function anactiveScroll() {
    scrollPosition = window.scrollY;
    body.style.top = `-${scrollY}px` 
    body.classList.toggle('no-scroll');
    html.classList.toggle('no-scroll');   
  }

  function activeScroll() {
    body.classList.toggle('no-scroll');
    body.removeAttribute('style');
    window.scrollTo({
      top: scrollPosition,
      behavior: "auto",
    })
    html.classList.toggle('no-scroll');
  }
}



async function renderFullCart(element) {
  const nameProduct = element.querySelector('h3').textContent;
  const product = await repo.getProduct(nameProduct);
  let fragment = document.createDocumentFragment();
  currentProduct = product;
  const baseData = await renderCart(product);
  fragment.appendChild(baseData);
  const sizes = renderSizes(product);
  const additives = renderAdditives(product);
  const priceWrapper = fragment.querySelector('.price-wrapper');
 
  console.log(priceWrapper);
  let inputsContainerSizes = document.createElement('div');
  inputsContainerSizes.classList.add('inputs-container')
  let inputsContainerAdditives = document.createElement('div');
  inputsContainerAdditives.classList.add('inputs-container')
  let totalp = document.createElement('p');
  let info = document.createElement('div');
  let infoIcon = document.createElement('span');
  let infoText = document.createElement('p');
  infoText.classList.add('info-text');
  infoIcon.classList.add('info-icon');
  info.classList.add('info-container');
  infoText.textContent = "The cost is not final. " +
    'Download our mobile app to see the final price and place your order. ' +
    'Earn loyalty points and enjoy your favorite coffee with up to 20% discount.'
  info.appendChild(infoIcon);
  info.appendChild(infoText);
  let button = document.createElement('button');
  button.classList.add('cart-form-button');
  button.textContent = 'Close';
  button.addEventListener('click', (event) => {
    modal.classList.toggle('active', false);
    toggleScreenScroll(true)
  });

  totalp.textContent = 'Total:'
  inputsContainerSizes.appendChild(sizes);
  inputsContainerAdditives.appendChild(additives);
  priceWrapper.before(inputsContainerSizes);
  priceWrapper.before(inputsContainerAdditives);
  priceWrapper.insertBefore(totalp, priceWrapper.querySelector('span'));
  priceWrapper.after(info);
  info.after(button);

  return fragment;
}

function renderSizes(product) {
  const fragment = document.createDocumentFragment();
  let namePath, radioContainer;
  namePath = document.createElement('p');
  namePath.textContent = 'Size';
  radioContainer = document.createElement('ul');
  radioContainer.classList.add('cart-radio-container');
  product.sizes.forEach((size, i) => {
    console.log('in inp')
    let label, radioInput, customRadioSpan, textLabel, radioItem;
    radioItem = document.createElement('li');
    radioItem.classList.add('radio-item');
    label = document.createElement('label');
    label.classList.add('cart-radio-label');
    textLabel = document.createElement('span');
    textLabel.classList.add('text-label');
    radioInput = document.createElement('input');
    customRadioSpan = document.createElement('span');
    customRadioSpan.classList.add('custom-radio')
    radioInput.type = 'radio';
    radioInput.value = size.addPrice;
    if(i == 0) radioInput.checked = true;
    radioInput.name = 'size';
    customRadioSpan.textContent = size.name;
    textLabel.textContent = size.size;
    label.appendChild(radioInput);
    label.appendChild(customRadioSpan);
    label.appendChild(textLabel);
    radioItem.appendChild(label);    
    radioContainer.appendChild(radioItem);
    radioInput.addEventListener('change', (event) => {
      sizeformProductAdd = Number(event.target.value);
      restPrise();
    })
  });
  fragment.appendChild(namePath);
  fragment.appendChild(radioContainer);
  return fragment;
}

function renderAdditives(product) {
  const fragment = document.createDocumentFragment();
  let namePath, checkboxContainer;
  namePath = document.createElement('p');
  namePath.textContent = 'Additives';
  checkboxContainer = document.createElement('ul');
  checkboxContainer.classList.add('cart-checkbox-container');
  product.additives.forEach((additive, i) => {
    console.log('in inp')
    let label, checkboxInput, customCheckboxSpan, textLabel, checkboxItem;
    checkboxItem = document.createElement('li');
    checkboxItem.classList.add('checkbox-item');
    label = document.createElement('label');
    label.classList.add('cart-checkbox-label');
    textLabel = document.createElement('span');
    textLabel.classList.add('text-label');
    checkboxInput = document.createElement('input');
    customCheckboxSpan = document.createElement('span');
    customCheckboxSpan.classList.add('custom-checkbox')
    checkboxInput.type = 'checkbox';
    checkboxInput.value = additive.addPrice;
    checkboxInput.name = 'additive';
    customCheckboxSpan.textContent = i + 1;
    checkboxItem.appendChild(label);
    label.appendChild(checkboxInput);
    label.appendChild(customCheckboxSpan);
    textLabel.textContent = additive.name;
    label.appendChild(textLabel);
    checkboxContainer.appendChild(checkboxItem);
    checkboxInput.addEventListener('change', (event) => {
      if(event.target.checked) {
        additiveFormProductAdd = additiveFormProductAdd === null ? Number(event.target.value) : additiveFormProductAdd + Number(event.target.value);
      } else {
        additiveFormProductAdd = additiveFormProductAdd - Number(event.target.value) == 0 ? null : additiveFormProductAdd - Number(event.target.value);
      }
      console.log('ev chec',event.target.value, event.target.checked);
      restPrise();
    })
  });
  fragment.appendChild(namePath);
  fragment.appendChild(checkboxContainer);
  
  return fragment;
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

function restPrise() {
  let price = Number(currentProduct.price);
  price += sizeformProductAdd;
  if(additiveFormProductAdd) price += additiveFormProductAdd;
  const priceSpan = modal.querySelector('.price');
  priceSpan.textContent = price.toFixed(2);
}

async function render() {
  await renderMenu();
}

render();

headerBind();
asideBind();