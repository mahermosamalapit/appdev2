const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory book collection
let books = [
  { id: 1, title: 'Book 1', author: 'Maria Hermosa' },
  { id: 2, title: 'Book 2', author: 'Mingmia' },
  { id: 3, title: 'Book 3', author: 'Miami' }
];

// Routes

// Welcome route
app.get('/', (req, res) => {
  res.send('Simple Book API using Node.js and Express');y
});

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get a book by ID
app.get('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  res.json(book);
});

// Add a new book
app.post('/api/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }
  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book
app.patch('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  books.splice(index, 1);
  res.json({ message: `Book with ID ${id} has been deleted.` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
