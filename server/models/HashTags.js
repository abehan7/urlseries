const mongoose = require("mongoose");
const getCurrentDate = require("./getCurrentDate");

const HashTagSchema = new mongoose.Schema({
  tag_name: {
    type: String,
    required: true,
  },
  url_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "urls" }],
  assigned: {
    type: Number,
    default: 0,
  },
  tag_assigned: {
    type: Number,
    default: 0,
  },
  tag_assignedOrigin: {
    type: Number,
    default: 0,
  },
  tag_shared: {
    type: Number,
    default: 0,
  },
  tag_clicked: {
    type: Number,
    default: 0,
  },
  user_id: {
    type: String,
    default: "hanjk123@gmail.com",
    ref: "users",
  },
  tag_firstDate: {
    type: Date,
    default: getCurrentDate(),
  },
});
const Hashtags = mongoose.model("hashtags", HashTagSchema);
module.exports = Hashtags;
