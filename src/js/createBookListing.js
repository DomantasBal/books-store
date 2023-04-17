// ==================== createBookListing.js ==================== //

// FORM SUBMIT EVENT
const form = document.getElementById("new-book-form");
form.addEventListener("submit", addNewBook);

function bookTemplate(book) {
  return `
    <article id=${book.id} class="single-book">
    <img src="${book.artwork}" />
    <div class="book-info">
      <h3 class="single-book__name editable">Title: ${book.name}</h3>
      <p class="single-book__author editable">Author: ${book.author}</p>
      <p class="single-book_category editable">Category: ${book.category}</p>
      <p class="single-book__years editable">Year: ${book.year}</p>
      <p class="single-book__price editable">${book.price}€</p>
    </div>
    <div class="book-controls">
      <button class="btn edit" data-book-id="${book.id}">Edit</button>
      <button class="btn save" data-book-id="${book.id}" style="display:none">Save</button>
      <button class="btn delete" data-book-id="${book.id}">Delete</button>
    </div>
  </article>
      `;
}

function bindBookEventListeners() {
  // EDIT BTN FUNC
  const editButtons = document.querySelectorAll(".btn.edit");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-book-id");
      editBook(bookId);
    });
  });

  // DELETE BTN FUNC
  const deleteButtons = document.querySelectorAll(".btn.delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const bookId = button.getAttribute("data-book-id");
      deleteBook(bookId);
    });
  });
}
