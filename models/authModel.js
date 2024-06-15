import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// static login method
AuthSchema.statics.login = async function ({ email, password }) {
  // valiadtion

  if (!email || !password) {
    throw Error('All fields are required!');
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error('Invalid login credentials!');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Invalid login!');
  }

  return user;
};

export default mongoose.model('Auth', AuthSchema, 'users');
