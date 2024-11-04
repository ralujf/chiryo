const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
    firstName: {
        type: String,
        required: true, 
    }, 
    lastName: {
        type: String,
        required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    personality: {
        type: String,
        required: true,
    }, 
    interests: {
        type: [String],
        required: true,
    },
    pdfInformation: {
        type: String, 
        required: false, 
    }
}, { timestamps: true })

const Application = mongoose.model('Application', ApplicationSchema)

module.exports = Application