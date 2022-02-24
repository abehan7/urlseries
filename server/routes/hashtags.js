const express = require("express");
const { updateLikeTags } = require("../controller/hashtags");
const auth = require("../middleware/auth.js");

const router = express.Router();
router.patch("/", auth, updateLikeTags);

module.exports = router;
