// ==================== deleteBook.js ==================== //

export function deleteBook(bookId) {
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
  updateFilters();
  location.reload();
}
