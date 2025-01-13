const User = require('../models/user')

const register = (req, res) => {
    // username, password, email, age, race, background, religion, location,
    const { registrationInfo } = req.body;
    const newUser = new User({ ...registrationInfo, firstLogin: false });
    
    newUser.save((err) => {
        if (err) {
            return res.status(500).send('Error registering new user');
        }
        return res.status(200).send('User registered successfully');
    });
}

const login = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Authentication failed. User not found.');
        }

        const isMatch = user.password === password;
        if (!isMatch) {
            return res.status(401).send('Authentication failed. Wrong password.');
        }
        next()
    } catch (err) {
        return res.status(500).send('Error logging in user');
    }
}

const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        return res.status(200).send('Logout successful' + token)
    } catch (err) {
        return res.status(500).send('Error logging out user');
    }
}

const deleteUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('User not found');
        }

        if (user.password === password) {
            await user.deleteOne().exec()
            return res.status(200).send('Successfully removed account');
        }

        return res.status(401).send('There was something wrong with the entered credentials');
    } catch (error) {
        return res.status(500).send(`There was an error: ${error}`);
    }
}

module.exports = { register, login, logout, deleteUser }