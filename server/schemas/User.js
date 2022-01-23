const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  passport: {
    type: String,
    required: true,
    unique: true
  },

  cash: {
    type: Number,
    default: 0,
    min: 0
  },

  credit: {
    type: Number,
    default: 0,
    min: 0
  }
});

module.exports = mongoose.model("User", userScheme);