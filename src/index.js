import image from './assets/logo.png';

import { MenuRepository } from './data/Repo.js';
import { asideBind, headerBind } from './HeaderNavigation';
import './sass/style.sass';
import slider from './Slider.js';



const homePage = document.querySelector(".home-page"); 

const menuPage = document.querySelector(".menu-page"); 
const slider3 = document.querySelector('#favorites-coffee')

menuRadio.forEach(radio => {
  radio.addEventListener('change', (event) => {
    renderMenu(event.target.value);
  })
})


window.addEventListener("hashchange", () => {
//   console.log('hash', location.hash, event)
  navigate(location.hash.replace("#", "") || "/", false);
});



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

init();

slider();

headerBind();
asideBind();