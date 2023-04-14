// ==================== localstorage.js ==================== //

let books = [];

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
  const updatedBooks = [...storedBooks, book];

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
      <h3 class="single-book__name">${book.name}</h3>
      <p class="single-book__author">${book.author}</p>
      <p class="single-book_category">${book.category}</p>
      <p class="single-book__years">${book.year}</p>
      <p class="single-book__price">${book.price}€</p>
    </div>
    <div class="book-controls">
      <button class="btn edit" onclick="editBook(${book.id})">Edit</button>
      <button class="btn delete">Delete</button>
    </div>
  </article>
      `;
}

function showBooks() {
  let books = JSON.parse(localStorage.getItem("books"));
  const booksContainer = document.querySelector(".books-container");
  books.forEach((book) => {
    booksContainer.innerHTML += bookTemplate(book);
  });
}

window.onload = showBooks;

// ==================== editBook.js ==================== //

function editBook(bookId) {
  console.log(bookId);
}
