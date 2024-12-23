const jwt = require('jsonwebtoken');
const User = require('../models/'); 

const generateJWT = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return token;
    } catch (error) {
        console.error(error);
        throw new Error('Error generating JWT');
    }
}

const validateJWT = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error('User not found');
        }
        
        return user;
    } catch (error) {
        console.error(error);
        throw new Error('Invalid token');
    }
}


module.exports = { generateJWT, validateJWT }