const router = require("express").Router();
const uploadImage = require("../middleware/uploadImage");
const uploadCtrl = require("../controller/uploadCtrl");
const authtest = require("../middleware/authtest");

router.post("/upload_avatar", uploadImage, authtest, uploadCtrl.uploadAvatar);

module.exports = router;
