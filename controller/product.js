const cloudinary = require("cloudinary");
const Product = require("../model/product");
exports.addProducts = async (req, res) => {
  const {
    title,
    description = "",
    categoryId,
    brand,
    price,
    tag = "",
    frameColor = "",
    frameShape = "",
    frameType = "",
    discount = 0,
  } = req.body;
  if (!req.files?.photo)
    return res
      .status(400)
      .send({ success: false, message: "Upload a photo or more" });

  if (!title || !categoryId || !brand || !price)
    return res
      .status(400)
      .send({ success: false, message: "Please provide all the fields" });

  try {
    let photos = [];

    if (Array.isArray(req.files.photo)) {
      for (file of req.files.photo) {
        // upload photo to cloudinary
        const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
          file.tempFilePath,
          { folder: "product-photos" }
        );
        photos.push({ id: public_id, secure_url });
      }
    } else {
      const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
        req.files.photo.tempFilePath,
        { folder: "product-photos" }
      );
      photos.push({ id: public_id, secure_url });
    }

    const product = await Product.create({
      title,
      description,
      category: categoryId,
      price,
      discount,
      brand,
      photos,
      tag,
      frameColor,
      frameShape,
      frameType,
    });

    res.status(201).send({ success: true, product });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// get all products  ---> /api/products
exports.getProducts = async (req, res) => {
  try {
    // get all products from db
    const products = await Product.find().populate("category");
    // if no products found return 404
    if (!products && products.length === 0)
      return res
        .status(404)
        .send({ success: false, message: "No products found" });

    // return all products
    res.status(200).send({ success: true, products });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};
