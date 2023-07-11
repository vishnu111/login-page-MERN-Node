const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide the email to continue"],
    unique: [true, "E-mail already exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide the password"],
    unique: false,
  },
});

//Create a new collection named "Users" in the database if it is not already exist
module.exports = mongoose.model.Users || mongoose.model("Users", UserSchema);
