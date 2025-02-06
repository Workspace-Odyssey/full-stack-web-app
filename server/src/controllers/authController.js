const { hashPassword, comparePassword } = require('../../src/util/passwordUtils'); 
const User = require('../models/userModels');
const asyncHandler = require("express-async-handler");

// Register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Fill out all the fields');
    }

    // Check if user exist
    const userExist = await User.findOne({ email });
        if(userExist) {
            res.status(400);
            throw new Error('User already exists');
        }

    const hashedPassword = await hashPassword(password);

    // Create user
    const [newUser] = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(newUser) {
        req.session.userId = newUser.id;
        req.session.username = newUser.name;

        res.status(201).json({
            message: 'User registered successfully'
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        res.status(400);
        throw new Error('Please provide email and password')
    }

    const user = await User.findOne({ email });
    if(!user) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    // compare the entered pw with the stored hashed password
    const isPasswordCorrect = await comparePassword(password, user.password);
    if(!isPasswordCorrect) {
        res.status(400);
        throw new Error('Invalid credentials');
    }

    req.session.userId = user.id;
    req.session.username = user.name;

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