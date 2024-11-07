import Post from '../models/Post.js';
import upload from '../utils/fileUpload.js';

// Create post
export const createPost = async (req, res) => {
  try {
    const post = new Post({
      userId: req.userId,
      content: req.body.content,
      image: req.file ? req.file.filename : null,
    });
    await post.save();
    await post.populate('userId', 'username name image');
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createPostWithPicture = [upload.single('image'), createPost];

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort('-createdAt')
      .populate('userId', 'username name image')
      .populate('comments.userId', 'username name image');
    res.json({ data: { posts } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Like/unlike post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const likeIndex = post.likes.indexOf(req.userId);
    if (likeIndex === -1) {
      post.likes.push(req.userId);
    } else {
      post.likes.splice(likeIndex, 1);
    }
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add comment
export const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.comments.push({
      userId: req.userId,
      content: req.body.content,
    });
    await post.save();
    await post.populate('comments.userId', 'username name image');
    res.status(201).json({ message: 'Comment added', post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};
