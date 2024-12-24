const { body, validationResult } = require('express-validator');
const UserController = require('../controller/userController');
const router = express.Router();

const userValidationChecks = [
    body('username').trim().isLength({ min: 3 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).escape()
]

router.post('/login', (req, res) => {
    try {
        UserController.login(req, res)
    } catch (error) {
        console.error(error)
    }
})
// TODO: Ensure the request has all relevant fields (see register function)
router.post('/register', userValidationChecks, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    UserController.register(req, res);
});

router.post('/logout', (req, res) => {
    // TODO: Check if the user is actually logged in 
    UserController.logout(req, res)
})

router.delete('/delete-user', [
    body('userId').isUUID().escape()
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    UserController.deleteUser(req, res);
});

module.exports = router;