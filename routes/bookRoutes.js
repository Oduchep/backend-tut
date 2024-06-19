import express from 'express';
import {
  addBook,
  deleteBook,
  getBooks,
  getSingleBook,
  updateBook,
} from '../controllers/bookController.js';
import requireAuth from '../middleware/requireAuth.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { bookValidation } from '../validation/bookValidation.js';

const router = express.Router();
// require auth for all book routes
router.use(requireAuth);

// get all books
router.get('/', getBooks);

// add book
router.post('/add-book', validateRequest(bookValidation), addBook);

// get single book
router.get('/:id', getSingleBook);

// update book
router.patch('/update-book/:id', updateBook);

// delete book
router.delete('/delete-book/:id', deleteBook);

export default router;
