import { notFoundError } from '../errors/customError.js';
import bookModel from '../models/bookModel.js';

// get all books
const getBooks = async (req, res, next) => {
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
    next(error);
  }
};

// get single book
const getSingleBook = async (req, res, next) => {
  const user_id = req.user?._id;
  const { id } = req.params;

  try {
    const book = await bookModel.findOne({ _id: id, user_id });
    if (!book) {
      return next(notFoundError('Book not found!'));
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

// add new book
const addBook = async (req, res, next) => {
  const body = req.body;
  const user_id = req.user._id;

  try {
    const book = await bookModel.create({ ...body, user_id });
    res.status(200).json(book);
  } catch (error) {
    return next(error);
  }
};

// update single book
const updateBook = async (req, res, next) => {
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
    if (!updatedBook) {
      return next(notFoundError('Book not found!'));
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    return next(error);
  }
};

// delete book
const deleteBook = async (req, res, next) => {
  const user_id = req.user?._id;
  const { id } = req.params;

  try {
    const book = await bookModel.findOneAndDelete({ _id: id, user_id });
    if (!book) {
      return next(notFoundError('Book not found!'));
    }
    res.status(200).json(book);
  } catch (error) {
    return next(error);
  }
};

export { getBooks, addBook, getSingleBook, updateBook, deleteBook };
