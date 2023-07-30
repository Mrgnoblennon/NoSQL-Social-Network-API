const User = require('../models/User');
const Thought = require('../models/Thought');

// Controller function to get all users
getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Server error. Failed to get users.' });
    }
  };

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to get user.' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user. Invalid data.' });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user. Invalid data.' });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Step 1: Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Step 2: Retrieve the list of thought IDs associated with the user
    const thoughtIds = user.thoughts;

    // Step 3: Delete all thoughts with those IDs from the Thought collection
    await Thought.deleteMany({ _id: { $in: thoughtIds } });

    // Step 4: Finally, delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User and associated thoughts deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error. Failed to delete user and thoughts.' });
  }
};


// Add a friend to the user
const addFriend = async (req, res) => {
  try {
    const { userId } = req.params;
    const { friendId } = req.body;

    // Find the user and friend in the database
    const user = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
    // need to add friend id to targetd user
    const friend = await User.findByIdAndUpdate(friendId, { $addToSet: { friends: userId } }, { new: true });

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or friend not found.' });
    }

    res.json({ user, friend });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to add friend.' });
  }
};


// Remove a friend from the user
const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to remove friend.' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
