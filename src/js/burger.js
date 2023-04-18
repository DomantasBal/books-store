// ==================== Burger.js ==================== //

const burger = document.querySelector(".burger");
const closeIcon = document.querySelector(".close-icon");
const header = document.querySelector("#header");

let originalHeaderTop = header.style.top;

burger.addEventListener("click", () => {
  header.style.opacity = 1;
  header.style.top = 0;
  burger.style.opacity = 0;
});

closeIcon.addEventListener("click", () => {
  burger.style.opacity = 1;
  header.style.opacity = 0;
  header.style.top = originalHeaderTop;
});
