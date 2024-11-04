import { generateJWT } from "../utils/auth";

const register = (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save((err) => {
        if (err) {
            return res.status(500).send('Error registering new user');
        }
        res.status(200).send('User registered successfully');
    });

    res.status(200).send('User registration logic goes here');
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Authentication failed. User not found.');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).send('Authentication failed. Wrong password.');
        }
        const token = user.generateJWT();

        res.status(200).send({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).send('Error logging in user');
    }
}

// Provide the user the ability to remove account entirely from system
const deleteUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username });
        res.status(200).send('Error removing account')
    } catch (error) {
        res.status(500).send(`There was an error: ${error}`)
    }

}

module.exports = { register, login, deleteUser }