const express = require("express");
const {
  addCategories,
  getCategories,
  updateCategories,
  deleteCategories,
} = require("../controller/category");

const isAuthenticated = require("../middleware/isAuthenticated");
const router = express.Router();

router.route("/categories").get(getCategories).post(isAuthenticated, addCategories);
// router.route("/categories").post(isAuthenticated, addCategories);
router.route("/categories/:id").put(isAuthenticated, updateCategories).delete(isAuthenticated, deleteCategories);
// router.route("/categories/:id").delete(isAuthenticated, deleteCategories);

module.exports = router;
