const express = require("express");
const {
  addFolder,
  deleteFolders,
  updateFolder,
} = require("../controller/folder.js");
const auth = require("../middleware/authtest.js");

const router = express.Router();
router.post("/", auth, addFolder);
router.post("/delete", auth, deleteFolders);
router.patch("/:_id", auth, updateFolder);

module.exports = router;
