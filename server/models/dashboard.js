const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const DashboardSchema = new Schema({
    user: {
        type: new Schema({
            _id: String,
            username: String,
            email: String
        }),
        required: true,
    },
    therapist: {
        type: new Schema({
            _id: String,
            firstName: String,
            lastName: String,
            email: String,
            expertise: String
        }),
        required: true 
    },
    location: {
        type: String, 
        required: true, 
        default: 'virtual'
    },
    time: {
        type: Date, 
        required: true,
    }, 
    diagnosis: {
        type: String, 
        required: true,
    }, 
    markResolvedUser: {
        type: Boolean,
        default: false, 
        required: true, 
    },
    markResolvedTherapist: {
        type: Boolean,
        default: false, 
        required: true, 
    }
}, {
  query: {
    returnTherapistTable() {
        return this.where({ user: this.user, location: this.location, time: this.time, markResolved: this.markResolvedUser, problem: this.problem });
    }, 
    returnUserTable() {
        return this.where({ therapist: this.therapist, location: this.location, time: this.time, markResolved: this.markResolvedUser });
    }
  }
}, { timestamps: true });

const Dashboard = mongoose.model('Dashboard', DashboardSchema)

module.exports = Dashboard