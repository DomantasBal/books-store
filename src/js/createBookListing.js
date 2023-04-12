const booksContainer = document.querySelector(".books-container");

let books = JSON.parse(localStorage.getItem("books"));

function bookTemplate(book) {
  //   console.log(book);
  return `
  <article id=book${book.id} class="single-book">
  <img src="./src/img/book-test.jpg" alt="" />
  <div class="book-info">
    <h3 class="single-book__name">${book.name}</h3>
    <p class="single-book__author">${book.author}</p>
    <p class="single-book_category">${book.category}</p>
    <p class="single-book__years">${book.year}</p>
    <p class="single-book__price">${book.price}€</p>
  </div>
  <div class="book-controls">
    <button class="btn edit">Edit</button>
    <button class="btn delete">Delete</button>
  </div>
</article>
    `;
}

books.forEach((book) => {
  console.log(bookTemplate(book));
  booksContainer.innerHTML += bookTemplate(book);
});
