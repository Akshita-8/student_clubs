const express = require('express');
const router = express.Router();
const Club = require('../models/club.model');


// GET route to fetch all clubs
router.get('/', async (req, res) => { // Change the route to `/` since `/api/clubs` is already prefixed
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ message: "Error fetching clubs" });
  }
});

module.exports = router;
