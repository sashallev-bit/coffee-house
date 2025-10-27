import { asideBind, headerBind } from './HeaderNavigation';
import './sass/style.sass';
import slider from './Slider.js';

const slider3 = document.querySelector('#favorites-coffee')


window.addEventListener("hashchange", () => {
//   console.log('hash', location.hash, event)
//  navigate(location.hash.replace("#", "") || "/", false);
});

//slider();

headerBind();
asideBind();