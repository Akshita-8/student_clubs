const express = require('express');
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname').isLength({min: 3}).withMessage('FullName must be at least  characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be 6 characters long')
],
   userController.registerUser
);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long')
], userController.loginUser);

module.exports = router;