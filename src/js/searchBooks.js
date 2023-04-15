function searchBooks(query) {
  return new Promise((resolve, reject) => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

    const filteredBooks = storedBooks.filter((book) =>
      book.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredBooks.length > 0) {
      resolve(filteredBooks);
    } else {
      reject("No books found");
    }
  });
}

function handleSearch(event) {
  event.preventDefault();

  const searchInput = document.getElementById("search-input");
  const query = searchInput.value;

  searchBooks(query)
    .then((books) => {
      const booksContainer = document.querySelector(".books-container");
      booksContainer.innerHTML = "";

      books.forEach((book) => {
        const bookHtml = bookTemplate(book);

        if (typeof bookHtml === "string") {
          booksContainer.innerHTML += bookHtml;
        }
      });

      bindBookEventListeners();
    })
    .catch((error) => {
      console.error(error);
    });
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleSearch);
