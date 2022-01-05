const mongoose = require("mongoose");
const getCurrentDate = require("./getCurrentDate");

const FolderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    default: "hanjk123@gmail.com",
  },
  folder_name: {
    type: String,
    required: true,
  },
  folder_contents: {
    type: Array,
    required: false,
    default: [],
  },
  folder_date_first: {
    type: Date,
    required: true,
    default: getCurrentDate(),
  },
  folder_edited: {
    type: Date,
    required: true,
    default: getCurrentDate(),
  },
  folder_liked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Folders = mongoose.model("folders", FolderSchema);
module.exports = Folders;
