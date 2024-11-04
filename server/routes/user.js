const { body, validationResult } = require('express-validator');
const UserController = require('../controller/userController');

const router = express.Router();

router.post('/register', [
    body('username').trim().isLength({ min: 3 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    UserController.register(req, res);
});

router.post('/create', [
    body('username').trim().isLength({ min: 3 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    UserController.create(req, res);
});

router.delete('/delete', [
    body('userId').isUUID().escape()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    UserController.deleteUser(req, res);
});

module.exports = router;