const Therapist = require("../models/therapist")
const router = express.Router 

// TODO: Add a way to differentiate between registered and unregistered therapists
router.get('/view-all-applicants', (req, res) => {
    Therapist.find().sort({ createdAt: 1 }).exec((err, therapists) => {
        if (err) {
            return res.status(500).send('Server side error occurred')
        }
        return res.status(200).json(therapists)
    })
})

router.post('/approve-therapist' , (req, res) => {
    const therapistInformation = req.body
    const therapist = new Therapist(therapistInformation)
    therapist.save((err) => {
        if (err) {
            return res.status(500).send('Server side error occurred')
        }
        return res.status(201).send('Therapist added')
    })

})

router.delete('/reject-therapist', (req, res) => {
    const therapistInformation = req.body
    const therapist = new Therapist(therapistInformation)
    therapist.deleteMany((err) => {
        if (err) {
            return res.status(500).send('Server was unable to delete user from database')
        }
        return res.status(201).send('Therapist deleted')
    })
})


module.exports = router 