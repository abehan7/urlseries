const mongoose = require("mongoose");
const getCurrentDate = require("./getCurrentDate");

const FolderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true },
  folder_name: { type: String, required: true },
  folder_contents: { type: Array, required: false, default: [] },
  folder_memo: { type: String, required: false, default: "" },
  folder_date_first: { type: Date, required: true, default: getCurrentDate() },
  folder_edited: { type: Date, required: true, default: getCurrentDate() },
  like: { type: Boolean, required: true, default: false },
});

const Folders = mongoose.model("folders", FolderSchema);
module.exports = Folders;
