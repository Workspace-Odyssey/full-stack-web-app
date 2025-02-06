const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware')
const { registerUser, loginUser, logoutUser } = require('../../src/controllers/authController');
const router = express.Router();
// when using authentication, .post is the only request available for this specific action
router.post('/register', registerUser);

router.post('/login', loginUser);

// authMiddleware added to prevent the user get an error if not logged in
router.post('/logout', authMiddleware, logoutUser);

module.exports = router;