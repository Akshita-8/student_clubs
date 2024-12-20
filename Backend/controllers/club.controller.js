const Club = require('../models/club.model');

module.exports.getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ message: 'Error fetching clubs', error });
  }
};
