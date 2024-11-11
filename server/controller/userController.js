const generateJWT = require('../utils/auth')

const register = (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    
    newUser.save((err) => {
        if (err) {
            return res.status(500).send('Error registering new user');
        }
        res.status(200).send('User registered successfully');
    });
}

const login = async (req, res) => {
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
        
        const token = generateJWT();
        res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).send('Error logging in user');
    }
}

const logout = async (req, res) => {
    try {
        // TODO: Remove token, forcefully redirect user
        console.log("Logging out User")
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        res.status(200).send('Logout successful');
    } catch (err) {
        res.status(500).send('Error logging out user');
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
            await user.deleteOne();
            return res.status(200).send('Successfully removed account');
        }

        res.status(401).send('There was something wrong with the entered credentials');
    } catch (error) {
        res.status(500).send(`There was an error: ${error}`);
    }
}

module.exports = { register, login, logout, deleteUser }