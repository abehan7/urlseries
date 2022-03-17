const express = require("express");
const { addFolder } = require("../controller/folder.js");
const auth = require("../middleware/authtest.js");

const router = express.Router();
router.post("/", auth, addFolder);

module.exports = router;
