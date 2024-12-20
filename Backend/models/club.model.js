const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    imageUrl: {
      type: String, // URL to the image
      required: true,
    },
  },
  { timestamps: true }
);

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;
