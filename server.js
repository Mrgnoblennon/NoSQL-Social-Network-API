const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const User = require('./models/User'); // Import the User model
const Thought = require('./models/Thought'); // Import the Thought model

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Check it out ${PORT}!`);
  });
});
