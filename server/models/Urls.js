const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const UrlSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 20,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  hashTags: {
    type: Array,
    required: false,
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
