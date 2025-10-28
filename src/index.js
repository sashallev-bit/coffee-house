import { asideBind, headerBind } from './HeaderNavigation';
import './sass/style.sass';
import { slider } from './Slider';

const favoritesSlider = document.querySelector('#favorites-coffee')


window.addEventListener("hashchange", () => {
//   console.log('hash', location.hash, event)
//  navigate(location.hash.replace("#", "") || "/", false);
});

document.querySelector('.coffee-menu_button').onclick = () => {
  window.location = '/menu.html';
};

slider(favoritesSlider);

headerBind();
asideBind();