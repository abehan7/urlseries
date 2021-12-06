const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: false,
  },
  user_pw: {
    type: String,
    required: false,
  },
  user_hashtags: {
    type: Array,
    required: false,
  },
  user_SelectUrls: {
    type: Array,
    required: false,
  },
  user_manyClickedUrls: {
    type: Array,
    required: false,
  },
});

const users = mongoose.model("users", UserSchema);
modules.exports = users;
