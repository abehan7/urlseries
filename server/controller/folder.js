const db = require("../models");
const getCurrentDate = require("../hooks/getCurrentDate");

const getShareFolderItems = async (req, res) => {
  const { _id } = req.params;
  const query = { _id };

  try {
    const folderItems = await db.Folders.findOne(query);
    console.log(folderItems?.share);
    folderItems?.share && res.json({ msg: "SHARED", folder: folderItems });
    !folderItems?.share && res.json({ msg: "NOT_SHARED", folder: null });
  } catch (error) {
    // console.error(error);
    console.log("this is an error");
    res.json({ msg: "NOT_FOUND" });
  }
};

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

const updateFolderShare = async (req, res) => {
  const user_id = req.user.id;
  const { _id } = req.params;
  console.log("updateFolderShare");

  const query = { _id, user_id };

  const update = (error, doc) => {
    doc.share = !doc.share;
    doc.folder_edited = getCurrentDate();
    doc.save();
    res.json(doc);
  };

  await db.Folders.findById(query, update).clone();
};

const updateFolderContents = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const { _id } = req.params;
  const { folder_contents } = req.body;

  const query = { _id, user_id };

  const update = (error, doc) => {
    doc.folder_contents = folder_contents;
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

module.exports = {
  getShareFolderItems,
  addFolder,
  updateFolder,
  deleteFolders,
  updateFolderLike,
  updateFolderShare,
  updateFolderContents,
};
