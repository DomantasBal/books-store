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
      color.style.background = "#fec868";
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

export function editBook(bookId) {
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
