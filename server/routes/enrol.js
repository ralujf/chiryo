const Application = require("../models/application")
const Therapist = require('../models/therapist')
const router = express.Router 

router.post('/apply', (req, res) => {
    const applicationInformation = req.body
    console.log(applicationInformation)
    const application = new Application(applicationInformation)

    application.save((err, therapistInformation) => {
        if (err) {
            return res.status(500).send('Save failed')
        }
        return res.status(200).json(therapistInformation)
    })
})

// TODO: Add a way to differentiate between registered and unregistered therapists
router.get('/view-all-applicants', (req, res) => {
    Application.find().sort({ createdAt: 1 }).exec((err, therapists) => {
        if (err) {
            return res.status(500).send('Server side error occurred')
        }
        return res.status(200).json(therapists)
    })
})

// TODO: Make these actually work lol
router.post('/approve-therapist', (req, res) => {
    const applicationInformation = req.body
    // TODO: Check all required fields are here
    const therapist = new Therapist(applicationInformation)
    therapist.save((err) => {
        if (err) {
            return res.status(500).send('Server side error occurred')
        }
        return res.status(201).send('Therapist added')
    })

})

router.delete('/reject-therapist', (req, res) => {
    const applicantId = req.params
    const therapist = Application.findByIdAndDelete(applicantId)
    therapist.deleteOne((err) => {
        if (err) {
            return res.status(500).send('Server was unable to delete user from database')
        }
        return res.status(200).send('Therapist deleted')
    })
})


module.exports = router 