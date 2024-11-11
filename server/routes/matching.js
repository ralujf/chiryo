const matchController = require('../controller/matchController')
const dashboardController = require('../controller/dashboardController')
const router = express.Router

router.post('/find-matches', async (req, res) => {
    try {
        const id = req.params
        const userInfo = req.body
        const result = await matchController.matchUserWithTherapist(id, userInfo)
    
        if (result) {
            dashboardController.insertToDashboard(id, result)
            res.status(200).send("Successfully matched")
        }
        
        res.status(500).send("Server error")

    } catch (error) {
        res.status(404).send("There was no matching id for this resource")
    }

})

module.exports = router



