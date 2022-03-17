const db = require("../models");
const getCurrentDate = require("../hooks/getCurrentDate");

const addFolder = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const { folder_name, folder_memo } = req.body;
  console.log(req.body);
  const update = { folder_name, user_id, folder_memo };
  const newFolder = new db.Folders(update);
  await newFolder.save();
  res.json(newFolder);
  console.log("inserted data from addFolder");
};

const updateFolder = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const { _id } = req.params;
  const { folder_name, folder_memo } = req.body;

  const query = { _id, user_id };

  const update = (error, doc) => {
    doc.folder_name = folder_name;
    doc.folder_memo = folder_memo;
    doc.url_updatedDate = getCurrentDate();
    doc.save();
    res.json(doc);
  };

  await db.Folders.findById(query, update).clone();
};

const updateFolderLike = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const { _id } = req.params;
  console.log("updateFolderLike");

  const query = { _id, user_id };

  const update = (error, doc) => {
    doc.like = !doc.like;
    doc.folder_edited = getCurrentDate();
    doc.save();
    res.json(doc);
  };

  await db.Folders.findById(query, update).clone();
};

const deleteFolders = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const { idList } = req.body;
  const query = { _id: { $in: idList }, user_id };
  await db.Folders.deleteMany(query);
  res.json(idList);
};

module.exports = { addFolder, updateFolder, deleteFolders, updateFolderLike };
