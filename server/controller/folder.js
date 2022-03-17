const addFolder = async (req, res) => {
  const { id } = req.user;
  const user_id = id;
  const { folder_name, folder_memo } = req.body;
  const update = { folder_name, user_id, folder_memo };
  const NewFolder = new db.Folders(update);
  await NewFolder.save();
  res.json(NewFolder);
  console.log("inserted data from addFolder");
};

const updateFolder = async (req, res) => {
  const { user_id } = req.decodedData;
  const { id } = req.params;
  const { folder_name } = req.body;

  const query = { _id: id, user_id };
  await db.Folders.findById(query, (error, doc) => {
    doc.folder_name = folder_name;
    doc.url_updatedDate = getCurrentDate();
    doc.save();
  }).clone();
};

module.exports = { addFolder, updateFolder };
