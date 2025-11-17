import { aside } from "./acide";


const burgerButton = document.querySelector(".burger-button");

export const toggleMenu = () => {
    burgerButton.classList.toggle("active");
    aside.classList.toggle("active");
  };

export function headerNavigation(page = '') {

  burgerButton.addEventListener("click", (event) => {
    toggleMenu();
  });   

  document.querySelector('.logo').addEventListener('click', (event) => {
    homePage.classList.toggle("active", true);
    menuPage.classList.toggle("active", false);
  //  navigate('/', true)
});

}

