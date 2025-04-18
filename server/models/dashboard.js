const mongoose = require('mongoose');
const User = require('./user');
const Therapist = require('./therapist');

const Schema = mongoose.Schema;

const DashboardSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    user: {
      type: new Schema({
        _id: { type: Schema.Types.ObjectId, ref: 'User' },
        username: String,
        email: String,
      }),
      required: true,
    },
    therapist: {
      type: new Schema({
        _id: { type: Schema.Types.ObjectId, ref: 'Therapist' },
        username: String,
        firstName: String,
        lastName: String,
        email: String,
        expertise: String,
      }),
      required: true,
    },
    location: {
      type: String,
      required: true,
      default: 'virtual',
    },
    locationLink: {
      type: String,
      required: false,
      default: '',
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
    },
  },
  {
    query: {
      returnTherapistTable() {
        return this.where({
          user: this.user,
          location: this.location,
          locationLink: this.locationLink,
          time: this.time,
          markResolved: this.markResolvedUser,
          problem: this.problem,
        });
      },
      returnUserTable() {
        return this.where({
          therapist: this.therapist,
          location: this.location,
          locationLink: this.locationLink,
          time: this.time,
          markResolved: this.markResolvedUser,
        });
      },
    },
  },
  { timestamps: true },
);

const Dashboard = mongoose.model('Dashboard', DashboardSchema);

module.exports = Dashboard;
