const mongoose = require("mongoose");

const HashTagsSchema = new mongoose.Schema({
  savedUrls: {
    type: Array,
    required: false,
  },
  uniqueUrls: {
    type: Array,
    required: false,
  },
});
const hashtags = mongoose.model("hashtags", HashTagsSchema);
modules.exports = hashtags;
