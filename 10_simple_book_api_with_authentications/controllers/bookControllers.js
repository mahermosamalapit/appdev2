const BookModel = require("../models/Book");

// Get all books
const fetchAllBooks = async (req, res) => {
  try {
    const allBooks = await BookModel.find({});
    res.json({ success: true, books: allBooks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single book by ID
const fetchBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const foundBook = await BookModel.findById(id);
    if (!foundBook)
      return res.json({ success: false, message: "Book not found" });

    res.json({ success: true, book: foundBook });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create a new book
const addBook = async (req, res) => {
  try {
    await BookModel.create(req.body);
    res.json({ success: true, message: "New book added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update an existing book
const modifyBook = async (req, res) => {
  const { id } = req.params;

  try {
    const existingBook = await BookModel.findByIdAndUpdate(id, req.body);
    if (!existingBook)
      return res.json({ success: false, message: "Book not found" });

    const updatedData = await BookModel.findById(id);
    res.json({ success: true, book: updatedData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a book by ID
const removeBook = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (!deletedBook)
      return res.json({ success: false, message: "Book not found" });

    res.json({ success: true, message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  fetchAllBooks,
  fetchBookById,
  addBook,
  modifyBook,
  removeBook,
};