import Joi from 'joi';

const addBookSchema = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().min(3).required(),
  pages: Joi.number().required(),
  genres: Joi.array().items(Joi.string()).required(),
  rating: Joi.number().required(),
});

const updateBookSchema = Joi.object({
  title: Joi.string().min(3),
  author: Joi.string().min(3),
  pages: Joi.number(),
  genres: Joi.array().items(Joi.string()),
  rating: Joi.number(),
  reviews: Joi.array(),
});

export { addBookSchema, updateBookSchema };
