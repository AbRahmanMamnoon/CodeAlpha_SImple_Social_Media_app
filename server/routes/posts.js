// routes/posts.js
import express from 'express';
import { auth } from '../middleware/auth.js';
import {
  createPostWithPicture,
  getAllPosts,
  likePost,
  addComment,
} from '../controllers/posts.js';

const router = express.Router();

// Add comment
router.post('/:id/comments', auth, addComment);

router.route('/').get(auth, getAllPosts).post(auth, createPostWithPicture);

// Like/unlike post
router.post('/:id/like', auth, likePost);

export default router;
