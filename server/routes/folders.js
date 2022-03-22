const express = require("express");
const {
  addFolder,
  deleteFolders,
  updateFolder,
  updateFolderLike,
  updateFolderContents,
  updateFolderShare,
  getShareFolderItems,
} = require("../controller/folder.js");
const auth = require("../middleware/authtest.js");

const router = express.Router();

router.get("/:_id/share", getShareFolderItems);
router.post("/", auth, addFolder);
router.post("/delete", auth, deleteFolders);
router.patch("/:_id", auth, updateFolder);
router.patch("/:_id/contents", auth, updateFolderContents);
router.put("/:_id/like", auth, updateFolderLike);
router.put("/:_id/share", auth, updateFolderShare);

module.exports = router;
