import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { userValidation } from '../validation/userValidation.js';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
});

// static sign-up method
userSchema.statics.signup = async function (data) {
  // valiadtion
  const { error } = userValidation.validate({ ...data });

  if (error) {
    throw Error(error.details[0].message);
  }

  const exists = await this.findOne({ email: data?.email });

  if (exists) {
    throw Error('Email already in use!');
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(data?.password, salt);

  const user = await this.create({ ...data, password: hash });

  return user;
};

export default mongoose.model('User', userSchema);
