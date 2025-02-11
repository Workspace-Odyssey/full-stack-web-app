const { hashPassword, comparePassword } = require('../../src/util/passwordUtils'); 
const User = require('../models/userModels');
const asyncHandler = require("express-async-handler");

// Register
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password} = req.body

    if(!username || !email || !password) {
        console.log('Missing fields in registration request');
        res.status(400);
        throw new Error('Fill out all the fields');
    }

    // Check if user exist
    const userExist = await User.findOne({ email });
        if(userExist) {
            console.log('User already exists:', email);
            res.status(400);
            throw new Error('User already exists');
        }

    const hashedPassword = await hashPassword(password);

    // Create user
    const [newUser] = await User.create({
        username,
        email,
        password: hashedPassword,
    }, ["username", "email", "password"])

    if(newUser) {
        console.log('New user created:', newUser);
        req.session.userId = newUser.id;
        req.session.username = newUser.username;

        res.status(201).json({
            message: 'User registered successfully'
        });
    } else {  
        console.log('Failed to create user');
        res.status(400);
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    console.log('Login request received:', req.body);

    const { usernameEmail, password } = req.body;

    if(!usernameEmail || !password) {
        console.log('Missing credentials in login request');
        res.status(400);
        throw new Error('Please provide email and password')
    }

    let user;
    // Check if it's an email or username
    if (usernameEmail.includes('@')) {
        console.log('Login attempt with email:', usernameEmail);
      // It's an email, so search by email
      user = await User.findOne({ email: usernameEmail });
    } else {
        console.log('Login attempt with username:', usernameEmail);
      // It's a username, so search by username
      user = await User.findOne({ username: usernameEmail });
    }
  
    if (!user) {
      console.log('Invalid credentials, user not found');
      res.status(400);
      throw new Error('Invalid credentials');
    }

    // compare the entered pw with the stored hashed password
    const isPasswordCorrect = await comparePassword(password, user.password);
    if(!isPasswordCorrect) {
        console.log('Invalid credentials, password incorrect');
        res.status(400);
        throw new Error('Invalid credentials');
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    console.log('Login successful:', user);
    res.status(200).json({ message: 'Login successful'})
})

const logoutUser = (req, res) => {
    // To clear the session data
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