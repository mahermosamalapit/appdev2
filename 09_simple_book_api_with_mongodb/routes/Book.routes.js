const express = require("express");
const {
  fetchAllBooks,
  fetchBookById,
  addBook,
  modifyBook,
  removeBook,
} = require("../controllers/bookController");

const router = express.Router();

router.get("/", fetchAllBooks);
router.get("/:id", fetchBookById);
router.post("/", addBook);
router.patch("/:id", modifyBook);
router.delete("/:id", removeBook);

module.exports = router;