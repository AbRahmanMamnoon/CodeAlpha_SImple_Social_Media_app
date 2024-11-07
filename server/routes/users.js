// routes/users.js
import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  addFriend,
  removeFriend,
} from '../controllers/users.js';

const router = express.Router();

// Get user profile
router.get('/profile', auth, getUserProfile);

// Update user profile
router.patch('/profile', auth, updateUserProfile);

// Get all users
router.get('/', auth, getAllUsers);

// Add friend
router.post('/friends/:id', auth, addFriend);

// Remove friend
router.delete('/friends/:id', auth, removeFriend);

export default router;
