import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bookRoutes from './routes/books.js';
import userRoutes from './routes/user.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello my friend!');
});

const port = process.env.PORT || 6005;

// connect to db
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port...${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
