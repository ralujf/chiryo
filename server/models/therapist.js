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
      required: !phoneNumber ? true : false,
    },
    phoneNumber: {
      type: String,
      required: !email ? true : false,
    },
    password: {
      type: String,
      required: true,
      unique: false,
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
  },
  { timestamps: true },
);

const Therapist = mongoose.model('Therapist', TherapistSchema);

module.exports = Therapist;
