const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ApplicationSchema = new Schema(
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
      required: true,
    },
    password: {
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
      required: true,
      unique: false,
    },
    pdfInformation: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;
