const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async(req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    console.log(req.body);

    const { fullname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        fullname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();
    res.status(201).json({token, user});
}

// module.exports.loginUser = async(req, res, next) =>{
//        const errors = validationResult(req);
//        if(!errors.isEmpty()){
//         return res.status.json({errors: errors.array()});
//        }
//     const {email, password} = req.body;
//     const user = await userModel.findOne({email}).select('+password');
// }

module.exports.loginUser = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    // Check if user exists
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid email or password' }] });
    }

    // Generate token
    const token = user.generateAuthToken();
    
    // Return response
    res.status(200).json({ token, user: { fullname: user.fullname, email: user.email } });
};
