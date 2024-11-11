const dashboardController = require('../controller/dashboardController')
const router = express.Router()

router.get('/load-user-dashboard', (req, res) => {
    try {
        const id = req.params
        const results = dashboardController.fetchDashboard(id)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send("An error occurred with the submitted id")
    }
})

router.post('/delete-row', (req, res) => {
    try {
        const id = req.params
        const row = req.body
        dashboardController.deleteRecord(id, row)
        res.status(200)
    } catch (error) {
        res.status(500).send("An error occurred with the submitted id")
    }
})

router.put('/update-field', (req, res) => {
    try {
        const id = req.params
        const row = req.body
        const results = dashboardController.updateRecord(id, row)
        res.status(200).json(results)
    } catch (error) {
        res.status(500).send("An error occurred with the submitted id")        
    }
})

module.exports = router