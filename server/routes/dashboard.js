const dashboardController = require('../controller/dashboardController')
const router = express.Router()

router.get('/load-dashboard-user', (req, res) => {
    try {
        const _id = req.params
        result = dashboardController.fetchDashboard()
        return results
    } catch (error) {
        res.send("Malformed Payload Provided").status(500)
    }
})

// Remove row from view, but keep in database for both users
router.post('/delete-row', (req, res) => {

})

// Update any row that is available in the table for two users
router.put('/update-field', (req, res) => {
    const { fieldRow, fieldName } = req.body 

})



module.exports = router

