let books = [];

// REFERENCE FOR BOOK OBJECT
// let book = {
//   id: 1,
//   name: "book name",
//   author: "author",
//   category: "category",
//   year: "year",
//   price: 32,
//   artwork: "https://something.com",
// };

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
  const book = new Book(
    books.length + 1,
    form.elements[0].value,
    form.elements[1].value,
    form.elements[2].value,
    form.elements[3].value,
    parseFloat(form.elements[4].value),
    form.elements[5].value
  );

  //   PUSHES NEW BOOK OBEJCT TO BOOKS ARRAY
  books.push(book);

  //   SETS BOOK OBJECT IN LOCALSTORAGE ARRAY
  localStorage.setItem("books", JSON.stringify(books));
  form.reset();
}

// FORM SUBMIT EVENT TRIGGER
const form = document.getElementById("new-book-form");
form.addEventListener("submit", addNewBook);
