const express = require("express");
const {
  updateLikeTags,
  getAssignedtags,
  getTotalTags,
} = require("../controller/hashtags");
const auth = require("../middleware/authtest.js");

const router = express.Router();
router.patch("/", auth, updateLikeTags);
router.get("/assigned", auth, getAssignedtags);
router.get("/total", auth, getTotalTags);

module.exports = router;
