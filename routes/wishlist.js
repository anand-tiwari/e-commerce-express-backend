const express = require("express");
const {
  addToWishlist,
  deleteItemFromWishlist,
  getWishlistsByUserId,
} = require("../controller/wishlist");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");

router
  .route("/user/wishlist")
  .post(isAuthenticated, addToWishlist)
  .get(isAuthenticated, getWishlistsByUserId);
router
  .route("/user/wishlist/:productId")
  .delete(isAuthenticated, deleteItemFromWishlist);

module.exports = router;
