const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const clubRoutes = require('./routes/club.routes');
connectToDb();

// Use JSON middleware
app.use(express.json());
// Use CORS middleware
app.use(cors());
app.use(express.urlencoded({extended: true}));

// Define a route
app.get('/', (req, res) => {
  res.send('Hello');
});

app.use("/api/users", userRoutes);
app.use("/api/clubs", clubRoutes);

// Export the app
module.exports = app;
