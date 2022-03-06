const express = require("express");

const { getDictionaryUrls, fetchContents } = require("../controller/crawler");

const router = express.Router();
router.patch("/dict/:num", getDictionaryUrls);
router.patch("/contents/:id", fetchContents);

module.exports = router;
