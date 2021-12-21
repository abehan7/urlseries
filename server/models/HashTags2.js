const mongoose = require("mongoose");

const HanshTags2Schema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
    default: "hanjk123@gmail.com",
  },
  hashtag_assigned: {
    type: Array,
    require: false,
  },
});

const Hashtags2 = mongoose.model("hashtags2", HanshTags2Schema);
module.exports = Hashtags2;