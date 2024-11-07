// routes/auth.js
import express from 'express';
import { registerWithPicture, login } from '../controllers/auth.js';

const router = express.Router();

// register
router.post('/register', registerWithPicture);

// Login
router.post('/login', login);

export default router;
