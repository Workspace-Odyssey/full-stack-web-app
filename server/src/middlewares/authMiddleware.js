// Check if user is authenticated, if a route allows users to access their profile, update their settings, 
// or perform actions that should only be available to logged-in users, you place the authMiddleware before that route handler to ensure only authenticated users can access it.
const authMiddleware = (req, res, next) => {
    if(req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized, login necessary'});
    }
}

module.exports = authMiddleware;