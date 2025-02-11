const { hashPassword, comparePassword } = require('../../src/util/passwordUtils'); 
const User = require('../models/userModels');
const asyncHandler = require("express-async-handler");

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body

    // Check if all required fields are provided
    if(!username || !email || !password) {
        res.status(400);
        throw new Error('Fill out all the fields');
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
        if(userExist) {
            res.status(400);
            throw new Error('User already exists');
        }

    const hashedPassword = await hashPassword(password);

    // Create a new user
    const [newUser] = await User.create({
        username,
        email,
        password: hashedPassword,
    }, ["username", "email", "password"])

    if(newUser) {

        // Store user session data
        req.session.userId = newUser.uuid;
        req.session.username = newUser.username;

        res.status(201).json({
            message: 'User registered successfully'
        });
    } else {  
        res.status(400);
        throw new Error('Invalid user data')
    }
})

// Login user
const loginUser = asyncHandler(async (req, res) => {

    const { usernameEmail, password } = req.body;

    // Check if credentials are provided
    if(!usernameEmail || !password) {
        res.status(400);
        throw new Error('Please provide email and password')
    }

    let user;
    // Check if it's an email or username
    if (usernameEmail.includes('@')) {
      // Search user by email
      user = await User.findOne({ email: usernameEmail });
    } else {
      // Search user by username
      user = await User.findOne({ username: usernameEmail });
    }
  
    if (!user) {
      res.status(400);
      throw new Error('Invalid credentials');
    }

    // compare the entered password with the stored hashed password
    const isPasswordCorrect = await comparePassword(password, user.password);
    if(!isPasswordCorrect) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    // Store user session data
    req.session.userId = user.uuid;
    req.session.username = user.username;

    res.status(200).json({ 
        message: 'Login successful', 
        user: {
            username: req.session.username,
            uuid: req.session.userId,
        }
    })
})

// Logout user by clearing session data
const logoutUser = (req, res) => {
    // Destroy the session data
    req.session.destroy((err) => {
        if(err) {;
            return res.status(500).json({error: 'Logout failed'});
        }
        res.status(200).json({message: 'Logout successful'});
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}