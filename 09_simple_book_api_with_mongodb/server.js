const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON

// In-memory book storage (4 books only)
let books = [
    { id: 1, title: "The Silent Patient", author: "Alex Michaelides" },
    { id: 2, title: "Educated", author: "Tara Westover" },
    { id: 3, title: "The Midnight Library", author: "Matt Haig" },
    { id: 4, title: "Where the Crawdads Sing", author: "Delia Owens" }
];

// Generate unique ID based on max existing ID
const getNextId = () => books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;

// Root route
app.get("/", (req, res) => {
    res.json({ message: "Simple Book API using Node.js and Express" });
});

// Get all books
app.get("/api/books", (req, res) => {
    res.json(books);
});

// Get book by ID
app.get("/api/books/:id", (req, res) => {
    const bookID = parseInt(req.params.id, 10);
    const book = books.find(b => b.id === bookID);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    res.json(book);
});

// Add a new book
app.post("/api/books", (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: "Both title and author are required" });
    }

    const newBook = {
        id: getNextId(),
        title,
        author
    };

    books.push(newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
});

// Update book details
app.patch("/api/books/:id", (req, res) => {
    const bookID = parseInt(req.params.id, 10);
    const { title, author } = req.body;
    const book = books.find(b => b.id === bookID);

    if (!book) {
        return res.status(404).json({ error: "Book not found" });
    }

    if (!title && !author) {
        return res.status(400).json({ error: "At least one of title or author is required to update" });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json({ message: "Book updated successfully", book });
});

// Delete a book
app.delete("/api/books/:id", (req, res) => {
    const bookID = parseInt(req.params.id, 10);
    const index = books.findIndex(b => b.id === bookID);

    if (index === -1) {
        return res.status(404).json({ error: "Book not found" });
    }

    books.splice(index, 1);

    res.json({ message: "Book deleted successfully" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
