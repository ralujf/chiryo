const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
    user: {
        type: String, 
        required: true,
    },
    therapist: {
        type: String,
        required: true 
    },
    location: {
        type: String, 
        required: true, 
    },
    time: {
        type: String, 
        required: true,
    }, 
    problem: {
        type: String, 
        required: true,
    }, 
    markResolved: {
        type: Boolean,
        default: false, 
        required: true, 
    }
}, {
  query: {
    returnTherapistTable() {
        return this.where({ user: this.user, location: this.location, time: this.time, problem: this.problem });
    }, 
    returnUserTable() {
        return this.where({ therapist: this.therapist, location: this.location, time: this.time, markResolved: this.markResolved });
    }
}
}, { timestamps: true });

const Dashboard = mongoose.model('Dashboard', DashboardSchema)

module.exports = Dashboard