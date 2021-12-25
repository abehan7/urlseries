const mongoose = require("mongoose");

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
  },
  folder_date_first: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  folder_edited: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Folders = mongoose.model("folders", FolderSchema);
module.exports = Folders;
