import express from 'express';
import { loginUser, signUpUser } from '../controllers/userController.js';

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/sign-up', signUpUser);

export default router;
