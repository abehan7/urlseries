const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  user_asignedTags: {
    type: Array,
    required: false,
  },
  user_totalTags: {
    type: Array,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Users = mongoose.model("users", UserSchema);
module.exports = Users;
