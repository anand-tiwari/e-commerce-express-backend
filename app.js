const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
require("dotenv").config();
require("./config/database").connect();
//regular middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

const corsConFig = {
  origin:['http://localhost:3000','https://ionvu-store.netlify.app', 'https://deploy-preview-25--ionvu-store.netlify.app'],
  credentials: true,
};
//cors middleware
app.use(cors(corsConFig));

// import all routes
const user = require("./routes/user");
const category = require("./routes/category");
const product = require("./routes/product");
const cart = require("./routes/cart");
const wishlist = require("./routes/wishlist");

//routes middlewares
app.use("/api/v1", user); // user routes
app.use("/api/v1", category); // category routes
app.use("/api/v1", product); // product routes
app.use("/api/v1", cart); // cart routes
app.use("/api/v1", wishlist); // wishlist routes

module.exports = app;
