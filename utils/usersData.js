const mongoose = require('mongoose');

const users = [
  {
    username: "user1",
    email: "user1@example.com",
    thoughts: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
    friends: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
  },
  {
    username: "user2",
    email: "user2@example.com",
    thoughts: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()],
    friends: [mongoose.Types.ObjectId()]
  },
  {
    username: "user3",
    email: "user3@example.com",
    thoughts: [mongoose.Types.ObjectId()],
    friends: [mongoose.Types.ObjectId()]
  },
  {
    username: "user4",
    email: "user4@example.com",
    thoughts: [mongoose.Types.ObjectId()],
    friends: [mongoose.Types.ObjectId(), mongoose.Types.ObjectId()]
  },
  // Add more users if needed
];

module.exports = users;
