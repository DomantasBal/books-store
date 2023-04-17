// ==================== filters.js ==================== //
function updateFilters() {
  const authorFilter = document.getElementById("authors-select");
  const categoryFilter = document.getElementById("category-select");
  const storedBooks = JSON.parse(localStorage.getItem("books"));

  // Get unique authors and categories from storedBooks
  const authors = [...new Set(storedBooks.map((book) => book.author))];
  const categories = [...new Set(storedBooks.map((book) => book.category))];

  // Clear and repopulate authorFilter
  authorFilter.innerHTML = `<option value="">All authors</option>`;
  authors.forEach((author) =>
    authorFilter.appendChild(new Option(author, author))
  );

  // Clear and repopulate categoryFilter
  categoryFilter.innerHTML = `<option value="">All categories</option>`;
  categories.forEach((category) =>
    categoryFilter.appendChild(new Option(category, category))
  );
}

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

// AUTHOR FILTER
const selectAuthor = document.getElementById("authors-select");
selectAuthor.addEventListener("change", filterAndRenderBooks);

// CATEGORY FILTER
const selectCategory = document.getElementById("category-select");
selectCategory.addEventListener("change", filterAndRenderBooks);

// PRICE SORT
const selectPrice = document.getElementById("price-select");
selectPrice.addEventListener("change", filterAndRenderBooks);

window.addEventListener("load", () => {
  filterAndRenderBooks();
  updateFilters();
});
