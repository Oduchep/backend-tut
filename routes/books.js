import express from 'express';
import {
  addBook,
  deleteBook,
  getBooks,
  getSingleBook,
  updateBook,
} from '../controllers/bookController.js';

const router = express.Router();

// get all books
router.get('/', getBooks);

// add book
router.post('/add-book', addBook);

// get single book
router.get('/:id', getSingleBook);

// update book
router.patch('/update-book/:id', updateBook);

// delete book
router.delete('/delete-book/:id', deleteBook);

export default router;