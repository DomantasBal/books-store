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

  // retrieve existing books from localStorage or initialize to an empty array
  const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

  const book = new Book(
    storedBooks.length + 1, // use the length of storedBooks instead of books
    form.elements[0].value,
    form.elements[1].value,
    form.elements[2].value,
    form.elements[3].value,
    parseFloat(form.elements[4].value),
    form.elements[5].value
  );

  // append the new book to the existing array or initialize the array with the new book
  const updatedBooks = [...storedBooks, book];

  //   SETS UPDATED BOOKS ARRAY IN LOCALSTORAGE
  localStorage.setItem("books", JSON.stringify(updatedBooks));
  form.reset();
}

// FORM SUBMIT EVENT TRIGGER
const form = document.getElementById("new-book-form");
form.addEventListener("submit", addNewBook);