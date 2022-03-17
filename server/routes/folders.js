const express = require("express");
const {
  addFolder,
  deleteFolders,
  updateFolder,
  updateFolderLike,
  updateFolderContents,
} = require("../controller/folder.js");
const auth = require("../middleware/authtest.js");

const router = express.Router();
router.post("/", auth, addFolder);
router.post("/delete", auth, deleteFolders);
router.patch("/:_id", auth, updateFolder);
router.patch("/:_id/contents", auth, updateFolderContents);
router.put("/:_id/like", auth, updateFolderLike);

module.exports = router;
