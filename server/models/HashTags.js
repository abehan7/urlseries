const mongoose = require("mongoose");

const HanshTagsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  hashtag_assigned: {
    type: Array,
    require: false,
  },
});

const Hashtags = mongoose.model("hashtags2", HanshTagsSchema);
module.exports = Hashtags;
