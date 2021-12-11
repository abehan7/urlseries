const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const getCurrentDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds)
  );
};

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
  url_firstDate: {
    type: Date,
    default: getCurrentDate(),
  },
  url_updatedDate: {
    type: Date,
    default: getCurrentDate(),
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
