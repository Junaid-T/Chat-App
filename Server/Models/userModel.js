const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//CHANGE TO WITHOUT MONGOOSE VERIFICATION

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: [true, "This email is already in use"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
  },
});

const User = mongoose.model("Users", usersSchema);

module.exports = User;
