const Thought = require('../models/Thought');
const User = require('../models/User');

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to get thoughts.' });
    console.log('HERE', err)
  }
};

// Get thought by ID
const getThoughtById = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findById(thoughtId).populate('reactions');
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to get thought.' });
  }
};

// Create a new thought
const createThought = async (req, res) => {
  try {
    // Step 1: Create the thought
    const thought = await Thought.create(req.body);

    // Step 2: Find the user by username
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Step 3: Add the thought's ObjectId to the user's thoughts array
    user.thoughts.push(thought._id);
    await user.save();

    res.status(201).json(thought);
  } catch (error) {
    console.error('Error creating thought:', error);
    res.status(500).json({ error: 'Server error. Failed to create thought.' });
  }
};

// Update thought by ID
const updateThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update thought. Invalid data.' });
  }
};

// Delete thought by ID
const deleteThought = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    // Find a thought by ID before deleteing
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }
    res.json({ message: 'Thought deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to delete thought.' });
  }
};

// Add a reaction to the thought
const addReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const thought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: req.body } }, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Server error. Failed to add reaction.' });
  }
};

// Remove a reaction from the thought
const removeReaction = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId: reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found.' });
    }

    // Step 1: Find the user by ID
    const user = await User.findById(thought.username);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Step 2: Retrieve the list of reaction IDs associated with the user
    const reactionIds = user.reactions;

    // Step 3: Delete all reactions with those IDs from the Thought collection
    await Thought.updateMany({ 'reactions.reactionId': { $in: reactionIds } }, { $pull: { reactions: { reactionId: { $in: reactionIds } } } });

    res.json(thought);
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Server error. Failed to remove reaction.' });
  }
};



module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
