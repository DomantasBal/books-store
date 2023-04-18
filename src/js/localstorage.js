// ==================== localstorage.js ==================== //

let savedBooks = [];

// CONSTRUCTOR FUNCTION TO POPULATE BOOK OBJECT WITH FORM DATA
function Book(id, name, author, category, year, price, artwork) {
  this.id = id;
  this.name = name;
  this.author = author;
  this.category = category;
  this.year = year;
  this.price = price;
  this.artwork = artwork;
}

// COLLECTS FORM DATA AND CREATES NEW OBJECT
export function addNewBook(event) {
  event.preventDefault();
  const form = document.getElementById("new-book-form");

  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  const booksArray = Array.isArray(storedBooks) ? storedBooks : [];

  const priceInput = form.elements[4];
  const price = parseFloat(priceInput.value);

  // Remove any existing error message and reset border color
  removeErrorMessage(priceInput);
  priceInput.style.borderColor = "";

  // Check if the price is a valid number
  if (isNaN(price)) {
    handleInvalidInput(priceInput);

    return;
  }

  const book = new Book(
    storedBooks.length + 1,
    form.elements[0].value,
    form.elements[1].value,
    form.elements[2].value,
    form.elements[3].value,
    parseFloat(form.elements[4].value),
    form.elements[5].value
  );

  // APPEND THE NEW BOOK TO THE ARRAY AT LOCALSTORAGE
  const updatedBooks = [...booksArray, book];

  //   SETS UPDATED BOOKS ARRAY IN LOCALSTORAGE
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  form.reset();
  updateFilters();
  location.reload();
}

export function handleInvalidInput(inputElement) {
  inputElement.style.borderColor = "red";
  inputElement.value = "";
  inputElement.placeholder = "Please enter a valid number for the price.";
}

export function removeErrorMessage(inputElement) {
  const errorMessage = inputElement.previousElementSibling;
  if (errorMessage && errorMessage.classList.contains("error-message")) {
    errorMessage.remove();
  }
}
