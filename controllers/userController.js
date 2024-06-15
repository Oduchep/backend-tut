import userModel from '../models/userModel.js';
import authModel from '../models/authModel.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: '3d' });
};

// register user
const signUpUser = async (req, res) => {
  const data = req.body;

  try {
    const user = await userModel.signup(data);

    // create a token
    const token = createToken(user?._id);

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.login({ email, password });

    // create a token
    const token = createToken(user?._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { signUpUser, loginUser };
