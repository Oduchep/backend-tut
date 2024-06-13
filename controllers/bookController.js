import bookModel from '../models/bookModel.js';
import { bookSchema } from '../schemas/bookSchema.js';

// get all books
const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;

    const allBooks = await bookModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json(allBooks);
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the documents' });
  }
};

// get single book
const getSingleBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookModel.findById(id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the book' });
  }
};

// add new book
const addBook = async (req, res) => {
  const body = req.body;
  try {
    const { error } = bookSchema.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const book = await bookModel.create(body);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// update single book
const updateBook = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// delete book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await bookModel.findByIdAndDelete(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the book' });
  }
};

export { getBooks, addBook, getSingleBook, updateBook, deleteBook };
