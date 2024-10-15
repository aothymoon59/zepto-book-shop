// app.js
const apiBaseURL = "https://gutendex.com/books";

// Fetch books from the API
async function fetchBooks(page = 1, search = "", genre = "all") {
  try {
    let url = `${apiBaseURL}?page=${page}`;
    if (search) url += `&search=${search}`;
    if (genre !== "all") url += `&topic=${genre}`;

    const response = await fetch(url);
    const data = await response.json();
    displayBooks(data.results);
    console.log("data", data);
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Display books on the homepage
function displayBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book-card");
    bookElement.innerHTML = `
      <h2>${book.title}</h2>
      <img src="${book.formats["image/jpeg"]}" alt="${book.title}" />
      <p>Author: ${book.authors.map((author) => author.name).join(", ")}</p>
      <p>Genre: ${book.subjects.join(", ")}</p>
      <button data-id="${book.id}" class="wishlist-btn">❤️</button>
    `;
    bookList.appendChild(bookElement);
  });
}

// Fetch and display books on page load
fetchBooks();
