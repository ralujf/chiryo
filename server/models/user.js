const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    adminId: {
      type: String,
      required: false,
      default: null,
      immutable: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    firstLogin: {
      type: Boolean,
      required: true,
      default: true,
    },
    role: {
      type: String,
      required: false,
      default: 'user',
      immutable: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
