const express = require("express");

const {
  getDictionaryUrls,
  fetchContents,
  fetchUrls,
} = require("../controller/crawler");

const router = express.Router();
router.patch("/dict/:num", getDictionaryUrls);
router.patch("/contents/:id", fetchContents);
router.get("/urls", fetchUrls);

module.exports = router;
