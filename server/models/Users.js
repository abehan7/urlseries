const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: false,
  },
  user_asignedTags: {
    type: Array,
    required: false,
  },
  user_totalTags: {
    type: Array,
    required: false,
  },
  user_recentSearchedIds: {
    type: Array,
    required: false,
  },
});

const Users = mongoose.model("userdatas", UserSchema);
module.exports = Users;
