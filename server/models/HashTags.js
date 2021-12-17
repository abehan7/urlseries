const mongoose = require("mongoose");

const HashTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  url_id: [{ type: Schema.Types.ObjectId, ref: "urls" }],
  assigned: {
    type: Number,
    default: 0,
  },
  assignedOrigin: {
    type: Number,
    default: 0,
  },
  shared: {
    type: Number,
    default: 0,
  },
  sharedOrigin: {
    type: Number,
    default: 0,
  },
});
const Hashtags = mongoose.model("hashtags", HashTagSchema);
module.exports = Hashtags;
