const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Added role
    socketId: { type: String },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET); // Include role in token
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
