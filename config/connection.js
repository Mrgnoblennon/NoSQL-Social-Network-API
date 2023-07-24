// Import required modules from mongoose
const { connect, connection } = require('mongoose');

// Define the connection string to the MongoDB database
// If the environment variable MONGODB_URI is set, use its value; otherwise, use the local connection string
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetwork';

// Connect to the MongoDB database using Mongoose with error handling
connect(connectionString, {
  useNewUrlParser: true,         // Use the new URL parser
  useUnifiedTopology: true,    // Use the new unified topology engine
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Export the connection object to be used in other parts of the application
module.exports = connection;
