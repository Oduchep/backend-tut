import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true, minlength: 3 },
    author: { type: String, required: true, minlength: 3 },
    pages: { type: Number, required: true },
    genres: { type: [String], required: true },
    rating: { type: Number, required: true },
    reviews: { type: Array },
  },
  { timestamps: true },
);

export default mongoose.model('Book', bookSchema);
