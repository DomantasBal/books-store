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
function addNewBook(event) {
  event.preventDefault();
  const form = document.getElementById("new-book-form");

  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  const booksArray = Array.isArray(storedBooks) ? storedBooks : [];

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
  location.reload();
}

// ==================== createBookListing.js ==================== //

// FORM SUBMIT EVENT
const form = document.getElementById("new-book-form");
form.addEventListener("submit", addNewBook);

function bookTemplate(book) {
  return `
    <article id=${book.id} class="single-book">
    <img src="./src/img/book-test.jpg" alt="" />
    <div class="book-info">
      <h3 class="single-book__name editable">Title: ${book.name}</h3>
      <p class="single-book__author editable">Author: ${book.author}</p>
      <p class="single-book_category editable">Category: ${book.category}</p>
      <p class="single-book__years editable">Year: ${book.year}</p>
      <p class="single-book__price editable">${book.price}€</p>
    </div>
    <div class="book-controls">
      <button class="btn edit" data-book-id="${book.id}">Edit</button>
      <button class="btn save" data-book-id="${book.id}" style="display:none">Save</button>
      <button class="btn delete" data-book-id="${book.id}">Delete</button>
    </div>
  </article>
      `;
}

function bindBookEventListeners() {
  // EDIT BTN FUNC
  const editButtons = document.querySelectorAll(".btn.edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-book-id");
      editBook(bookId);
    });
  });

  // DELETE BTN FUNC
  const deleteButtons = document.querySelectorAll(".btn.delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-book-id");
      deleteBook(bookId);
    });
  });
}

// ==================== editBook.js ==================== //

function makeFieldsEditable(bookElement, isEditable) {
  bookElement.querySelectorAll(".editable").forEach((field) => {
    field.contentEditable = isEditable;
  });

  fieldsColorChange(bookElement, isEditable);
}

function fieldsColorChange(bookElement, isEditable) {
  // Styling on editing
  const nameField = bookElement.querySelector(".single-book__name");
  const authorField = bookElement.querySelector(".single-book__author");
  const categoryField = bookElement.querySelector(".single-book_category");
  const yearsField = bookElement.querySelector(".single-book__years");
  const priceField = bookElement.querySelector(".single-book__price");

  let colorChange = [
    nameField,
    authorField,
    categoryField,
    yearsField,
    priceField,
  ];

  if (isEditable) {
    for (let color of colorChange) {
      color.style.background = "#8AFFFF";
    }
  } else {
    for (let color of colorChange) {
      color.style.background = "none";
    }
  }
}

function saveEditedBook(bookElement, bookId) {
  let updatedBook = {
    id: bookId,
    name: bookElement.querySelector(".single-book__name").innerText,
    author: bookElement.querySelector(".single-book__author").innerText,
    category: bookElement.querySelector(".single-book_category").innerText,
    year: bookElement.querySelector(".single-book__years").innerText,
    price: parseFloat(
      bookElement.querySelector(".single-book__price").innerText.slice(0, -1)
    ),
    artwork: "",
  };

  // Retrieve storedBooks from localStorage
  const storedBooks = JSON.parse(localStorage.getItem("books"));
  // Find the index of the book to update
  const bookIndex = storedBooks.findIndex((book) => book.id === bookId);

  // Update the book in the storedBooks array
  storedBooks[bookIndex] = updatedBook;

  localStorage.setItem("books", JSON.stringify(storedBooks));
  makeFieldsEditable(bookElement, false);
}

function editBook(bookId) {
  const bookElement = document.getElementById(bookId);

  const saveButton = bookElement.querySelector(".btn.save");
  const editButton = bookElement.querySelector(".btn.edit");

  if (editButton.textContent === "Edit") {
    makeFieldsEditable(bookElement, true);
    editButton.textContent = "Cancel";
    saveButton.style.display = "inline-block";
  } else {
    makeFieldsEditable(bookElement, false);
    editButton.textContent = "Edit";
    saveButton.style.display = "none";
  }

  saveButton.addEventListener("click", () => {
    saveEditedBook(bookElement, parseInt(bookId));
    editButton.textContent = "Edit";
    saveButton.style.display = "none";
  });
}

// ==================== deleteBook.js ==================== //

function deleteBook(bookId) {
  const storedBooks = JSON.parse(localStorage.getItem("books"));
  const idNumber = Number(bookId);

  // Find the index of the book to delete
  const bookIndex = storedBooks.findIndex((book) => book.id === idNumber);

  if (bookIndex !== -1) {
    storedBooks.splice(bookIndex, 1);
    localStorage.setItem("books", JSON.stringify(storedBooks));
  } else {
    alert("book was not found in database.");
  }

  location.reload();
}

// ==================== filters.js ==================== //

function filterAndRenderBooks() {
  const authorFilter = document.getElementById("authors-select");
  const categoryFilter = document.getElementById("category-select");
  const priceSort = document.getElementById("price-select");
  const storedBooks = JSON.parse(localStorage.getItem("books"));

  let filteredBooks = storedBooks;

  if (authorFilter !== null && authorFilter.value) {
    filteredBooks = filteredBooks.filter(
      (book) => book.author === authorFilter.value
    );
  }

  if (categoryFilter !== null && categoryFilter.value) {
    filteredBooks = filteredBooks.filter(
      (book) => book.category === categoryFilter.value
    );
  }

  if (priceSort !== null && priceSort.value) {
    filteredBooks.sort((a, b) => {
      if (priceSort.value === "min-max") {
        return a.price - b.price;
      } else if (priceSort.value === "max-min") {
        return b.price - a.price;
      }
      return 0;
    });
  }

  const booksContainer = document.querySelector(".books-container");
  if (booksContainer !== null) {
    booksContainer.innerHTML = ""; // Clear previous content before adding new ones
    filteredBooks.forEach((book) => {
      const bookHtml = bookTemplate(book);
      if (typeof bookHtml === "string") {
        booksContainer.innerHTML += bookHtml;
      }
    });
    bindBookEventListeners();
  }
}

// AUTHOR FILTER
const selectAuthor = document.getElementById("authors-select");
selectAuthor.addEventListener("change", filterAndRenderBooks);

// CATEGORY FILTER
const selectCategory = document.getElementById("category-select");
selectCategory.addEventListener("change", filterAndRenderBooks);

// PRICE SORT
const selectPrice = document.getElementById("price-select");
selectPrice.addEventListener("change", filterAndRenderBooks);

window.addEventListener("load", filterAndRenderBooks);

// ==================== search.js ==================== //

function searchBooks() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase().trim();
  const storedBooks = JSON.parse(localStorage.getItem("books"));

  let filteredBooks = storedBooks.filter((book) =>
    book.name.toLowerCase().includes(searchTerm)
  );

  const booksContainer = document.querySelector(".books-container");
  if (booksContainer !== null) {
    booksContainer.innerHTML = "";
    filteredBooks.forEach((book) => {
      const bookHtml = bookTemplate(book);
      if (typeof bookHtml === "string") {
        booksContainer.innerHTML += bookHtml;
      }
    });
    bindBookEventListeners();
  }
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchBooks();
});
