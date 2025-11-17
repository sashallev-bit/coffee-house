import MenuRepository = require("./MenuRepository");

const repo = new MenuRepository();

const menuRadio = document.querySelectorAll('input[name="menu"]');

menuRadio.forEach(radio => {
  radio.addEventListener('change', (event) => {
    renderMenu(event.target.value);
  })
})

let couter = 0;

// document.querySelector('.load-prod-button').addEventListener('click', () => {
//   couter += 1;
//  // repo.getProducts.
// } );

async function renderMenu(category: string = '') {
  
  const list = document.querySelector('.menu-list') as HTMLElement | null;
  if (!list) return;
  list.innerHTML = '';
  let categ =  category;
  if(!category) {
    categ = menuPage.querySelector('input[name="menu"]:checked').value;
  }

  let perPageColumn = Infinity;

  if (document.ofsetWidth <= 768) {
    perPageColumn = 4;
  }
  
  repo.getProducts().then(node => {
    console.log('node', node);
    node.filter((prod) => prod.category == categ).forEach(async (element) => {
        const cart = await renderCart(element);
        let listItem = document.createElement('li');
        listItem.appendChild(cart);
        list.appendChild(listItem);
    })
  });
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

async function setBackground(imageProduct: HTMLElement, imageUrl: string) {
  try {
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      imageProduct.style.backgroundImage = `url('${imageUrl}')`;
    };
    
    img.onerror = () => {
      console.error('error load background:', imageUrl);
      imageProduct.style.backgroundImage = `url('../assets/icon/ic_coffee-cup')`;
    };
    
  } catch (error) {
     console.log('set err', imageUrl, imageProduct);
  }
}ui