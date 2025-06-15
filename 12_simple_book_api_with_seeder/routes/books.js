const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const authenticateToken = require('../middleware/auth');
const sendBookCreatedEmail = require('../middleware/send-email.middleware'); //Email middleware

// GET all books
router.get('/', authenticateToken, async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// POST new book with email notification
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    const newBook = new Book({ title, author, publishedYear });
    await newBook.save();

    // ✅ Send email
    await sendBookCreatedEmail(newBook);

    res.status(201).json({
      message: 'Book created and email sent',
      book: newBook
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
