const dashboardController = require('../controller/dashboardController')
const router = express.Router()

router.get('/load-user-dashboard', (req, res) => {
    try {
        const { userId, offset }  = req.params
        const results = dashboardController.fetchDashboard(userId, offset)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send("An error occurred with the submitted id")
    }
})

router.delete('/delete-row', (req, res) => {
    try {
        const userId = req.params
        const row = req.body
        dashboardController.deleteRecord(userId, row)
        res.status(200)
    } catch (error) {
        res.status(500).send("An error occurred with the submitted id")
    }
})

router.put('/update-field', (req, res) => {
    try {
        const userId = req.params
        const row = req.body
        const results = dashboardController.updateRecord(userId, row)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send("An error occurred with the submitted id")        
    }
})

module.exports = router