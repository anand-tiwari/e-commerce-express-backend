const express = require("express");
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserDetails,
} = require("../controller/user");
const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();


router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout);
router.route("/forgot-password").get(forgotPassword);
router.route("/password/reset/:token").post(resetPassword);
router.route("/user/profile").get(isAuthenticated,getUserDetails);
router.route("/user/update_password").post(isAuthenticated,updateUserPassword);
router.route("/user/update_user_details").post(isAuthenticated,updateUserDetails);

module.exports = router;
