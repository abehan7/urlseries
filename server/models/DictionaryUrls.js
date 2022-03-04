const mongoose = require("mongoose");

const DictionaryUrlSchema = new mongoose.Schema({
  dictionary_url_dummy: [
    {
      type: String,
      required: true,
    },
  ],
  date: {
    type: Date,
    default: Date.now(),
  },
  resource: {
    type: String,
    required: true,
  },
  start_url: {
    type: String,
    required: true,
  },
});

const DictionaryUrls = mongoose.model("dictionary_urls", DictionaryUrlSchema);

module.exports = DictionaryUrls;
