const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const therapistSchema = Schema({
    firstName: {
        type: String,
        required: true,
    }, 
    lastName: {
        type: String, 
        required: true, 
    },
    age: {
        type: Number, 
        required: true,
    }, 
    race: {
        type: String, 
        required: true, 
    },
    background: {
        type: String, 
        required: true, 
    }, 
    religion: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true, 
    }, 
    email: {
        type: String, 
        required: true,
    }, 
    password: {
        type: String, 
        required: true, 
        unique: true, 
    },
    yoe: {
        type: Number,
        required: false,
        unique: false, 
    }, 
    reviews: {
        type: Array, 
        required: true, 
        unique: false, 
    }
}, { timestamps: true })

const Therapist = mongoose.model('Therapist', therapistSchema)

module.exports = Therapist