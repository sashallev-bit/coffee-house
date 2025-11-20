import { toggleMenu } from "./header";


export const aside = document.querySelector("aside");

aside.querySelectorAll("a").forEach((navLink) => {
  navLink.addEventListener("click", () => {
    toggleMenu();
  });
});

