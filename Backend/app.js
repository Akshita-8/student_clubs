const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');

// Use JSON middleware
app.use(express.json());

// Use CORS middleware
app.use(cors());

// Define a route
app.get('/', (req, res) => {
  res.send('Hello');
});

// Export the app
module.exports = app;
