import express from 'express';
import path from 'path';
import { ObjectId } from 'mongodb';

import Db from './db.js';
import { validator } from './utils/helpers.js';
import { addBookSchema, updateBookSchema } from './schemas/books.js';

const { connectToDb, getDb } = Db;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello my friend!');
});

// get all books
app.get('/api/books', (req, res) => {
  let allBooks = [];
  const page = req.query.page || 1;
  const limit = 3;

  db.collection('books')
    .find()
    .skip((page - 1) * limit)
    .limit(limit)
    .forEach((book) => allBooks.push(book))
    .then(() => {
      res.status(200).json(allBooks);
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

// get single book
app.get('/api/books/:id', (req, res) => {
  const _id = req.params.id;

  if (ObjectId.isValid(_id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(_id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not fetch the book' });
      });
  } else {
    res.status(500).json({ error: 'Book id is invalid!' });
  }
});

// add book
app.post('/api/add-book', (req, res) => {
  const book = req.body;
  const { error } = validator({ value: book, schema: addBookSchema });

  if (error) {
    res.status(400).send({ error: error.details[0].message });
    return;
  }

  db.collection('books')
    .insertOne(book)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(() => res.status(500).json({ error: 'Could not add book!' }));
});

// update book
app.patch('/api/update-book/:id', (req, res) => {
  const _id = req.params.id;
  const updatedBook = req.body;

  const { error } = validator({ value: updatedBook, schema: updateBookSchema });

  if (error) {
    res.status(400).send({ error: error.details[0].message });
    return;
  }

  if (ObjectId.isValid(_id)) {
    db.collection('books')
      .updateOne({ _id: new ObjectId(_id) }, { $set: updatedBook })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not updated book!' });
      });
  } else {
    res.status(500).json({ error: 'Book id is invalid!' });
  }
});

// delete book
app.delete('/api/delete-book/:id', (req, res) => {
  const _id = req.params.id;

  if (ObjectId.isValid(_id)) {
    db.collection('books')
      .deleteOne({ _id: new ObjectId(_id) })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(() => {
        res.status(500).json({ error: 'Could not delete the book' });
      });
  } else {
    res.status(500).json({ error: 'Book id is invalid!' });
  }
});

const port = process.env.PORT || 6005;
let db;

// db connection
connectToDb((err) => {
  // check error then listen for port
  if (!err) {
    app.listen(port, () => {
      console.log(`Server is running on port...${port}`);
    });

    db = getDb();
  }
});
