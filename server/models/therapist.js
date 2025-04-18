const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TherapistSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: () => {
        return this.phoneNumber != null;
      },
    },
    phoneNumber: {
      type: String,
      required: () => {
        return this.email != null;
      },
    },
    password: {
      type: String,
      required: true,
      unique: false,
    },
    username: {
      type: String,
      required: true,
      unique: false,
      immutable: true,
    },
    age: {
      type: Number,
      required: false,
    },
    race: {
      type: String,
      required: false,
    },
    background: {
      type: String,
      required: false,
    },
    religion: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    expertise: {
      type: String,
      required: true,
    },
    yoe: {
      type: Number,
      required: false,
      unique: false,
    },
    reviews: {
      type: Array,
      required: false,
      unique: false,
    },
    role: {
      type: String,
      required: false,
      default: 'therapist',
      immutable: true,
    },
  },
  { timestamps: true },
);

const Therapist = mongoose.model('Therapist', TherapistSchema);

module.exports = Therapist;
