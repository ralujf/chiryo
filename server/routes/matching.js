const matchController = require('../controller/matchController')
const dashboardController = require('../controller/dashboardController')
const router = express.Router

// Use Google API Here
router.post('/find-matches', async (req, res) => {
    const id = req.params
    const result = await matchController.matchUserWithTherapist()

    // TODO: push these matches to the users dashboard
    dashboardController.insertToDashboard()
})

module.exports = router



