// ==================== General.js ==================== //

const addNewBookBtn = document.querySelector(".add-book");

addNewBookBtn.addEventListener("click", () => {
  const form = document.getElementById("new-book-form");
  form.elements[0].focus();
  scrollToSection("new-book");
});

const heroBtn = document.querySelector("#hero-btn");

heroBtn.addEventListener("click", () => {
  scrollToSection("books");
});

export function scrollToSection(id) {
  const section = document.getElementById(id);
  section.scrollIntoView({ behavior: "smooth" });
}
