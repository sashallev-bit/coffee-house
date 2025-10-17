import image from './assets/logo.png';

import { MenuRepository } from './data/Repo.js';
import './sass/style.sass';
import slider from './Slider.js';

const burgerButton = document.querySelector(".burger-button");

const aside = document.querySelector("aside");

const homePage = document.querySelector(".home-page"); 

const menuPage = document.querySelector(".menu-page"); 

const repo = new MenuRepository();

const menuRadio = document.querySelectorAll('input[name="menu"]');

const slider3 = document.querySelector('#favorites-coffee')

menuRadio.forEach(radio => {
  radio.addEventListener('change', (event) => {
    renderMenu(event.target.value);
  })
})

burgerButton.addEventListener("click", (event) => {
  toggleMenu();
});

aside.querySelectorAll("a").forEach((navLink) => {
  navLink.addEventListener("click", () => {
    toggleMenu();
  });
});

const toggleMenu = () => {
  burgerButton.classList.toggle("active");
  aside.classList.toggle("active");
};

window.addEventListener("hashchange", () => {
//   console.log('hash', location.hash, event)
  navigate(location.hash.replace("#", "") || "/", false);
});

window.addEventListener ('resize', () => {
  if(window.ofsetWidth <= 768) 

})

let couter = 0;

document.querySelector('.load-prod-button').addEventListener('click', () => {
  couter += 1;
  repo.getProducts.
} )


function renderHome() {
  
}

function init () {
  const currentPath = location.hash.replace("#", "");
  navigate(currentPath, true)
};

async function navigate(path, push = true) {

  if(push) { 
    switch (path) {
      case '/menu':
        await renderMenu()
        break;
    
      default:
        renderHome()
        break;
    }
  history.pushState({}, "", "#" + path);
}
}

document.querySelectorAll('.coffee-menu').forEach( button => {
  button.addEventListener('click', (event) => {
    homePage.classList.toggle("active", false);
    menuPage.classList.toggle("active", true);
    navigate('/menu', true)
  });
});

document.querySelector('.logo').addEventListener('click', (event) => {
  homePage.classList.toggle("active", true);
  menuPage.classList.toggle("active", false);
  navigate('/', true)
});

async function renderMenu(category = '') {
  
  const list = document.querySelector('.menu-list');
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

init();

slider();