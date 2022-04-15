const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const {
  getCartsByUserId,
  addToCart,
  incCartItemQuantity,
  decCartItemQuantity,
  deleteItemFromCart,
} = require("../controller/cart");

router
  .route("/user/cart")
  .get(isAuthenticated, getCartsByUserId)
  .post(isAuthenticated, addToCart);

router
  .route("/user/increase_quantity")
  .patch(isAuthenticated, incCartItemQuantity);
router
  .route("/user/decrease_quantity")
  .patch(isAuthenticated, decCartItemQuantity);


router
  .route("/user/cart/:productId")
  .delete(isAuthenticated, deleteItemFromCart)

module.exports = router;
