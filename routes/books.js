const express = require('express');
const router = express.Router();
const Book = require('/models/book');
const authenticateToken = require('../middleware/auth');

// GET all books
router.get('/', authenticateToken, async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// POST new book
router.post('/', authenticateToken, async (req, res) => {
  const { title, author, publishedYear } = req.body;
  const newBook = new Book({ title, author, publishedYear });
  await newBook.save();
  res.status(201).json(newBook);
});

// PATCH update book
router.patch('/:id', authenticateToken, async (req, res) => {
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBook);
});

// DELETE book
router.delete('/:id', authenticateToken, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
