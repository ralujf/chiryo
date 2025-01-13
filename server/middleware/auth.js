const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

/**
 * 
 * @param {string} userId 
 * @returns 
 * @description - Takes in a users id, if it is valid then a JWT returned
 */
const generateJWT = async (req, res) => {
    const { userId } = req.body
    try {
        const user = await User.findById(userId);

        if (!user) throw new Error('User not found');

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return res.status(200).send({ message: 'Login successful', token })
    } catch (error) {
        return res.status(500).send(`There was an error ${error}`)
    }
}

const validateJWT = async (req, res, next) => {
    const token = req.headers['authorization'];
    const { userId } = req.params
    
    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided!');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(userId);

        if (!user) {
            return res.status(500).send('User does not exist');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(400).send('Invalid Token');
    }
}

const checkIdAdmin = (req, res, next) => {
    const adminID = req.body.adminID;

    if (!adminID || adminID !== process.env.ADMIN) {
        return res.status(403).send('User forbidden');
    }
    next();
};

module.exports = { generateJWT, validateJWT, checkIdAdmin }