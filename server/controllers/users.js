import User from '../models/User.js';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate(
      'friends',
      'username name image'
    );

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, image } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, image },
      {
        new: true,
      }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('username name image bio')
      .where('_id')
      .ne(req.userId);
    res.json({ data: { users } });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Add friend
export const addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const friend = await User.findById(req.params.id);
    if (!friend) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.friends.includes(friend._id)) {
      return res.status(400).json({ error: 'Already friends' });
    }
    user.friends.push(friend._id);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Remove friend
export const removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.friends = user.friends.filter((id) => id.toString() !== req.params.id);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
