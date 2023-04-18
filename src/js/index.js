import {
  addNewBook,
  handleInvalidInput,
  removeErrorMessage,
} from "./localstorage.js";

// import { addNewBook } from "./localstorage.js";
import { bookTemplate, bindBookEventListeners } from "./createBookListing.js";
import { editBook } from "./editBook.js";
import { deleteBook } from "./deleteBook.js";
import { updateFilters, filterAndRenderBooks } from "./filters.js";
import { searchBooks } from "./search.js";
import { scrollToSection } from "./general.js";
import "./burger.js";

// FORM SUBMIT EVENT
const form = document.getElementById("new-book-form");
form.addEventListener("submit", addNewBook);

// AUTHOR FILTER
const selectAuthor = document.getElementById("authors-select");
selectAuthor.addEventListener("change", filterAndRenderBooks);

// CATEGORY FILTER
const selectCategory = document.getElementById("category-select");
selectCategory.addEventListener("change", filterAndRenderBooks);

// PRICE SORT
const selectPrice = document.getElementById("price-select");
selectPrice.addEventListener("change", filterAndRenderBooks);

// SEARCH FUNCTION
const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchBooks();
  scrollToSection("books");
});

// ADD NEW BOOK BUTTON
const addNewBookBtn = document.querySelector(".add-book");

addNewBookBtn.addEventListener("click", () => {
  const form = document.getElementById("new-book-form");
  form.elements[0].focus();
  scrollToSection("new-book");
});

// HERO BUTTON
const heroBtn = document.querySelector("#hero-btn");

heroBtn.addEventListener("click", () => {
  scrollToSection("books");
});

window.addEventListener("load", () => {
  filterAndRenderBooks();
  updateFilters();
});

// GLOBAL FUNCTIONS
// window.addNewBook = addNewBook;
// window.handleInvalidInput = handleInvalidInput;
// window.removeErrorMessage = removeErrorMessage;
// window.bookTemplate = bookTemplate;
// window.bindBookEventListeners = bindBookEventListeners;
// window.editBook = editBook;
// window.deleteBook = deleteBook;
// window.updateFilters = updateFilters;
// window.filterAndRenderBooks = filterAndRenderBooks;
// window.searchBooks = searchBooks;
// window.scrollToSection = scrollToSection;
