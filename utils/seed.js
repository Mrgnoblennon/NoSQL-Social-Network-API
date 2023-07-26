const db = require('../config/connection');
const User = require('../models/User'); // Import the User model
const Thought = require('../models/Thought'); // Import the Thought model
const usersData = require('./usersData');
const thoughtsData = require('./thoughtsData'); // Add this line

const seedDatabase = async () => {
  try {
    // Connect to the database
    await db;

    // Clear existing data (optional, only do this if you want to start with a clean slate)
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Seed users
    const users = await User.create(usersData);

    // Seed thoughts
    const thoughts = await Thought.create(thoughtsData);


    
    // Associate thoughts with users
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const userThoughts = thoughts.filter(
        (thought) => thought.username === user.username
      );
      user.thoughts = userThoughts.map((thought) => thought._id);
      await user.save();
    }

    console.log('Sample data created successfully.');
    process.exit(0); // Exit the script after data creation
  } catch (error) {
    console.error('Error seeding the database:', error);
    process.exit(1); // Exit the script with an error code
  }
};

seedDatabase();