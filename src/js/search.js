// ==================== search.js ==================== //

export function searchBooks() {
  const searchInput = document.getElementById("search-input");
  const searchTerm = searchInput.value.toLowerCase().trim();
  const storedBooks = JSON.parse(localStorage.getItem("books"));

  let filteredBooks = storedBooks.filter((book) =>
    book.name.toLowerCase().includes(searchTerm)
  );

  const booksContainer = document.querySelector(".books-container");

  if (booksContainer !== null) {
    booksContainer.innerHTML = "";

    if (filteredBooks.length > 0) {
      filteredBooks.forEach((book) => {
        const bookHtml = bookTemplate(book);
        if (typeof bookHtml === "string") {
          booksContainer.innerHTML += bookHtml;
        }
      });

      bindBookEventListeners();
    } else {
      booksContainer.innerText = "No books found.";
    }
  }
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchBooks();
  scrollToSection("books");
});
