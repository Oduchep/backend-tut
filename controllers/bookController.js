import bookModel from '../models/bookModel.js';
import { bookValidation } from '../validation/bookValidation.js';

// get all books
const getBooks = async (req, res) => {
  const user_id = req.user?._id;

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 30;

    const allBooks = await bookModel
      .find({ user_id })
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
  const user_id = req.user?._id;
  const { id } = req.params;

  try {
    const book = await bookModel.findOne({ _id: id, user_id });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found or not authorized!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not fetch the book' });
  }
};

// add new book
const addBook = async (req, res) => {
  const body = req.body;

  try {
    const { error } = bookValidation.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user_id = req.user._id;

    const book = await bookModel.create({ ...body, user_id });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// update single book
const updateBook = async (req, res) => {
  const user_id = req.user?._id;
  const { id } = req.params;

  try {
    const updatedBook = await bookModel.findOneAndUpdate(
      { _id: id, user_id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found or not authorized!' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete book
const deleteBook = async (req, res) => {
  const user_id = req.user?._id;
  const { id } = req.params;

  try {
    const book = await bookModel.findOneAndDelete({ _id: id, user_id });
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ error: 'Book not found or not authorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Could not delete the book' });
  }
};

export { getBooks, addBook, getSingleBook, updateBook, deleteBook };
