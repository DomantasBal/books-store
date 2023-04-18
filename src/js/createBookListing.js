// ==================== createBookListing.js ==================== //

// FORM SUBMIT EVENT
const form = document.getElementById("new-book-form");
form.addEventListener("submit", addNewBook);

export function bookTemplate(book) {
  return `
    <article id=${book.id} class="single-book">
    <div class="single-book__img">
    <img src="${book.artwork}" />
    </div>
    <div class="book-info">
    <div>
    <span>Title:</span> <h3 class="single-book__name editable">${book.name}</h3>
    </div>
    <div>
    <span>Author:</span>  <p class="single-book__author editable">${book.author}</p>
    </div>
    <div>
    <span>Category:</span>  <p class="single-book_category editable">${book.category}</p>
    </div>
    <div>
    <span>Year:</span> <p class="single-book__years editable">${book.year}</p>
    </div>
    <div class="price">
    <p class="single-book__price editable">${book.price}</p><span>€</span> 
    </div>
    </div>
    <div class="book-controls">
      <button class="btn edit" data-book-id="${book.id}">Edit</button>
      <button class="btn save" data-book-id="${book.id}" style="display:none">Save</button>
      <button class="btn delete" data-book-id="${book.id}">Delete</button>
    </div>
  </article>
      `;
}

export function bindBookEventListeners() {
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
