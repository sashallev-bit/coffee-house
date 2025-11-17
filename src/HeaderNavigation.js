import { stopAuto } from "./Slider";

export function headerBind() {

  const burgerButton = document.querySelector(".burger-button");

  burgerButton.addEventListener("click", (event) => {
    toggleMenu();
  });
}

export function asideBind() {

  const aside = document.querySelector("aside");
  
  aside.querySelectorAll("a").forEach((navLink) => {
    navLink.addEventListener("click", () => {
      toggleMenu();
   });
  });
}

const toggleMenu = () => {
  burgerButton.classList.toggle("active");
  aside.classList.toggle("active");
};

document.querySelectorAll('.coffee-menu').forEach( button => {
  button.addEventListener('click', (event) => {
    stopAuto()
  //  navigate('/menu', true)
  });
});

document.querySelector('.logo').addEventListener('click', (event) => {
  //navigate('/', true)
});