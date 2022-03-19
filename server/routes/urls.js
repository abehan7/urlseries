const express = require("express");
const {
  getLikeUrls,
  addUrl,
  addUrls,
  updateUrl,
  deleteUrls,
  getTotalUrls,
  updateUrlLike,
} = require("../controller/urls.js");

const auth = require("../middleware/authtest.js");

const router = express.Router();
router.get("/like", auth, getLikeUrls);
router.get("/", auth, getTotalUrls);
router.post("/", auth, addUrl);
router.post("/batch", auth, addUrls);
router.patch("/:id", auth, updateUrl);
router.post("/delete", auth, deleteUrls);
router.put("/like/:id", auth, updateUrlLike);

// router.get("/assigned", auth, getAssignedtags);

module.exports = router;
