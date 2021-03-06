const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const getCurrentDate = require("./getCurrentDate");

const UrlSchema = new mongoose.Schema({
  url_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    default: mongoose.Types.ObjectId,
  },
  url: { type: String, required: false },
  url_title: { type: String, required: false },
  url_hashTags: { type: Array, required: false, default: [] },
  url_memo: { type: String, required: false, default: "" },
  url_likedUrl: { type: Number, default: 0, required: false },
  url_clickedNumber: { type: Number, default: 0, required: false },
  url_firstDate: { type: Date, default: getCurrentDate() },
  url_updatedDate: { type: Date, default: getCurrentDate() },
  url_search: {
    url_searchClicked: { type: Number, default: 0, required: false },
    url_searchedDate: { type: Date, default: getCurrentDate() },
  },
  user_id: { type: mongoose.Types.ObjectId, required: true },
});

const connection = mongoose.createConnection(
  "mongodb+srv://illbeatdisney:Oat97c53AmCkt4lH@urlapp.ankxa.mongodb.net/ururl?retryWrites=true&w=majority"
);
autoIncrement.initialize(connection);

const Urls = mongoose.model("urls", UrlSchema);

// exports.UrlSchema = UrlSchema;
// exports.Urls = Urls;
module.exports = { Urls, UrlSchema };
