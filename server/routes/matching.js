const matchController = require('../controller/matchController')
const dashboardController = require('../controller/dashboardController')
const User = require('../models/user')
const router = express.Router
// TODO: Add validation to ALL ROUTES
router.post('/find-matches', async (req, res) => {
    try {
        const id = req.params
        const currentUser = User.findById(id)

        if (!currentUser) {
            res.status(400).send("There is an issue with the payload")
        }

        const result = await matchController.matchUserWithTherapist(id, userInfo)
    
        if (result) {
            dashboardController.insertToDashboard(id, result)
            res.status(200).send("Successfully matched").then(() => res.redirect('/dashboard'))
        }
        
        res.status(500).send("Server error, matching unsuccessful")

    } catch (error) {
        res.status(404).send("There was no matching id for this resource")
    }

})

module.exports = router



