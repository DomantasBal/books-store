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
      <h3 class="single-book__name editable">${book.name}</h3>
      <p class="single-book__author editable">${book.author}</p>
      <p class="single-book_category editable">${book.category}</p>
      <p class="single-book__years editable">${book.year}</p>
      <p class="single-book__price editable">${book.price}€</p>
    </div>
    <div class="book-controls">
      <button class="btn edit" data-book-id="${book.id}">Edit</button>
      <button class="btn save" data-book-id="${book.id}" style="display:none">Save</button>
      <button class="btn delete">Delete</button>
    </div>
  </article>
      `;
}

function showBooks() {
  console.log("show");
  let books = JSON.parse(localStorage.getItem("books"));
  const booksContainer = document.querySelector(".books-container");

  if (!Array.isArray(books)) {
    books = [];
  }

  //  Populates booksContainer with book templates
  books.forEach((book) => {
    booksContainer.innerHTML += bookTemplate(book);
  });

  // Selects all Edit buttons
  const editButtons = document.querySelectorAll(".btn.edit");

  // Iterates through each Edit button
  editButtons.forEach((button) => {
    // Attaches a click event listener to each button
    button.addEventListener("click", () => {
      // Retrieves the bookId from the data-book-id attribute
      const bookId = button.getAttribute("data-book-id");

      // Calls the editBook function with the retrieved bookId
      editBook(bookId);
    });
  });
}

window.addEventListener("load", showBooks);

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
