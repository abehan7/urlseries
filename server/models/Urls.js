const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const UrlSchema = new mongoose.Schema({
  url_id: {
    type: Number,
    default: 20,
  },
  url: {
    type: String,
    required: true,
  },
  url_title: {
    type: String,
    required: true,
  },
  url_hashTags: {
    type: Array,
    required: false,
  },
  url_memo: {
    type: String,
    required: false,
  },
  url_clickedNumber: {
    type: Number,
    required: true,
  },
  url_likedUrl: {
    type: Number,
    required: true,
  },
});

const connection = mongoose.createConnection(
  "mongodb+srv://illbeatdisney:Oat97c53AmCkt4lH@urlapp.ankxa.mongodb.net/ururl?retryWrites=true&w=majority"
);
autoIncrement.initialize(connection);

UrlSchema.plugin(autoIncrement.plugin, {
  model: "Urls",
  field: "id",
  // startAt: 79,
  // increasementBy: 1,
});
const Urls = mongoose.model("urls", UrlSchema);
Urls.nextCount((err, count1) => {
  console.log(count1);
  var urls = new Urls();
});

module.exports = Urls;
