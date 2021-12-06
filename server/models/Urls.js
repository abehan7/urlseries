const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const UrlSchema = new mongoose.Schema({
  url_id: {
    type: Number,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
  url_title: {
    type: String,
    required: false,
  },
  url_hashTags: {
    type: Array,
    required: false,
    default: [],
  },
  url_memo: {
    type: String,
    required: false,
    default: "",
  },
  url_clickedNumber: {
    type: Number,
    default: 0,
    required: false,
  },
  url_likedUrl: {
    type: Number,
    default: 0,
    required: false,
  },
});

const connection = mongoose.createConnection(
  "mongodb+srv://illbeatdisney:Oat97c53AmCkt4lH@urlapp.ankxa.mongodb.net/ururl?retryWrites=true&w=majority"
);
autoIncrement.initialize(connection);

UrlSchema.plugin(autoIncrement.plugin, {
  model: "Urls",
  field: "url_id",
  startAt: 88,
  // increasementBy: 1,
});
const Urls = mongoose.model("urls", UrlSchema);
Urls.nextCount((err, count1) => {
  // var urls = new Urls();
  console.log(count1);
  // urls.resetCount((err, next) => {
  //   console.log(next);
  // });
});

module.exports = Urls;
