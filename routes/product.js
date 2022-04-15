const express = require("express");
const { addProducts, getProducts } = require("../controller/product");

const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router
  .route("/products")
  .post(isAuthenticated, addProducts)
  .get(getProducts);

module.exports = router;
