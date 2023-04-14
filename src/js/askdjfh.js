function showBooks() {
  let books = JSON.parse(localStorage.getItem("books"));
  const booksContainer = document.querySelector(".books-container");

  if (!Array.isArray(books)) {
    books = [];
    console.log(books);
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
