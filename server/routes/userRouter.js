const router = require("express").Router();
// const session = require("express-session");

const userCtrl = require("../controller/userCtrl");
const authtest = require("../middleware/authtest");
const authAdmin = require("../middleware/authAdmin");

router.post("/register", userCtrl.register);
router.post("/activation", userCtrl.activateEmail);
router.post("/login", userCtrl.login);
router.post("/refresh_token", authtest, userCtrl.getAccessToken);
router.post("/forgot", userCtrl.forgotPassword);
router.post("/reset", authtest, userCtrl.resetPassword);
router.get("/infor", authtest, userCtrl.getUserInfor);
router.get("/all_infor", authtest, authAdmin, userCtrl.getUsersAllInfor);
router.get("/logout", userCtrl.logout);
router.patch("/update", authtest, userCtrl.updateUser);
router.patch("/update_role/:id", authtest, authAdmin, userCtrl.updateUsersRole);
router.delete("/delete/:id", authtest, authAdmin, userCtrl.deleteUser);
router.post("/google_login", userCtrl.googleLogin);
module.exports = router;
