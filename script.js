document.addEventListener("DOMContentLoaded", function () {
    const bookContainer = document.querySelector(".book-container");

    // Function to create a new book element
    function createBookElement(title, author, cover, review, rating) {
        const book = document.createElement("div");
        book.classList.add("book");

        // Book cover image
        const img = document.createElement("img");
        img.src = cover;
        img.alt = title;
        book.appendChild(img);

        // Book title
        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        book.appendChild(titleElement);

        // Book author
        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${author}`;
        book.appendChild(authorElement);

        // User review
        const reviewElement = document.createElement("p");
        reviewElement.textContent = `Review: ${review}`;
        book.appendChild(reviewElement);

        // User rating
        const ratingElement = document.createElement("p");
        ratingElement.textContent = `Rating: ${rating}/5`;
        book.appendChild(ratingElement);

        // Save button
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save Book";
        saveBtn.classList.add("save-btn");
        saveBtn.addEventListener("click", function () {
            saveBookToLocalStorage(title, author, cover, review, rating); // Save the book to local storage when save button is clicked
        });
        book.appendChild(saveBtn);

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.addEventListener("click", function () {
            book.remove(); // Remove the book when delete button is clicked
            updateLocalStorage(); // Update local storage after deletion
        });
        book.appendChild(deleteBtn);

        // Add book element to the container
        bookContainer.appendChild(book);
    }

    // Function to save a book to local storage
    function saveBookToLocalStorage(title, author, cover, review, rating) {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        books.push({ title, author, cover, review, rating });
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Update local storage with current book data
    function updateLocalStorage() {
        const books = [];
        bookContainer.querySelectorAll(".book").forEach(book => {
            const title = book.querySelector("h3").textContent;
            const author = book.querySelector("p:nth-child(2)").textContent.substring(8);
            const cover = book.querySelector("img").src;
            const review = book.querySelector("p:nth-child(3)").textContent.substring(8);
            const rating = parseFloat(book.querySelector("p:nth-child(4)").textContent.substring(8));
            books.push({ title, author, cover, review, rating });
        });
        localStorage.setItem("books", JSON.stringify(books));
    }

    // Load books from local storage when the page loads
    function loadBooksFromLocalStorage() {
        const books = JSON.parse(localStorage.getItem("books")) || [];
        books.forEach(book => {
            createBookElement(book.title, book.author, book.cover, book.review, book.rating);
        });
    }

    loadBooksFromLocalStorage(); // Load books when the page loads

    // Event listener for adding a book
    const addBookBtn = document.getElementById("add-book");
    addBookBtn.addEventListener("click", function () {
        document.getElementById("file-input").click(); // Trigger file input when add book button is clicked
    });

    // Event listener for file input change
    const fileInput = document.getElementById("file-input");
    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];
        if (file) {
            // Read file data (e.g., cover image) and add book element
            const reader = new FileReader();
            reader.onload = function (e) {
                const cover = e.target.result; // File data (base64 encoded)
                const title = prompt("Enter the book title:");
                const author = prompt("Enter the author's name:");
                const review = prompt("Enter your review:");
                const rating = parseFloat(prompt("Enter your rating (out of 5):"));
                createBookElement(title, author, cover, review, rating); // Create a new book element with user input
            };
            reader.readAsDataURL(file); // Read file as data URL
        }
    });
});
