// utils/seed.js

const { connect, connection } = require('mongoose');
const usersSeedData = require('./usersData'); // Assuming this file contains users seed data
const thoughtsSeedData = require('./thoughtsData'); // Assuming this file contains thoughts seed data
const User = require('../models/user'); // Assuming the User model is defined in ../models/user.js
const Thought = require('../models/thought'); // Assuming the Thought model is defined in ../models/thought.js

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetwork';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Clear existing data from the collections (Optional step)
    await User.deleteMany();
    await Thought.deleteMany();

    // Insert users seed data into the User collection
    const createdUsers = await User.insertMany(usersSeedData);

    // Create an array to hold thought objects with associated user IDs
    const thoughtsWithUserIds = thoughtsSeedData.map(thought => {
      const user = createdUsers.find(user => user.username === thought.username);
      return { ...thought, username: user._id };
    });

    // Insert thoughts seed data into the Thought collection
    await Thought.insertMany(thoughtsWithUserIds);

    console.log('Seed data inserted successfully!');
    connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
    connection.close();
  }
};

seedDatabase();
