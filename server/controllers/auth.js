// controllers/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import upload from '../utils/fileUpload.js';

// Register
export const register = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = new User({
      username,
      password: hashedPassword,
      name,
      image: req.file ? req.file.filename : null,
    });
    await user.save();
    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        image: user.image,
        bio: user.bio,
        friends: user.friends,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const registerWithPicture = [upload.single('image'), register];

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        image: user.image,
        bio: user.bio,
        friends: user.friends,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
