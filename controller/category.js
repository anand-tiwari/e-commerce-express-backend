const Category = require("../model/category");
const cloudinary = require("cloudinary");

// get all categories  ---> /api/categories
exports.getCategories = async (req, res) => {
  try {
    // get all categories from db
    const categories = await Category.find();
    // if no categories found return 404
    if (!categories && categories.length === 0)
      return res
        .status(404)
        .send({ success: false, message: "No categories found" });

    // return all categories
    res.status(200).send({ success: true, categories });
  } catch (error) {
    // if error return 500
    res.status(500).send({ success: false, message: error.message });
  }
};

// add category ---> /api/categories
exports.addCategories = async (req, res) => {
  // check if category image & category name is provided
  if (!req.files.photo || !req.body.name)
    return res
      .status(400)
      .send({ success: false, message: "Please upload a photo" });
  let file = req.files.photo;
  try {
    // upload photo to cloudinary
    const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "category-photos",
      }
    );
    // create category in db
    const category = await Category.create({
      name: req.body.name,
      photo: {
        id: public_id,
        secure_url,
      },
    });
    res.status(201).send({ success: true, category });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

// update category ---> /api/categories/:id
exports.updateCategories = async (req, res) => {
  if (!req.files.photo || !req.body.name || !req.params.id)
    return res
      .status(400)
      .send({ success: false, message: "Please upload a photo" });
  let file = req.files.photo;
  try {
    // upload photo to cloudinary
    const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "category-photos",
      }
    );
    // get  category from db
    const category = await Category.findById(req.params.id);

    // if no category found return 404
    if (!category)
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });

    // delete old photo from cloudinary
    await cloudinary.v2.uploader.destroy(category.photo.id);

    // update category in db
    category.name = req.body.name;
    category.photo = {
      id: public_id,
      secure_url,
    };
    category.save();

    res.status(201).send({ success: true, category });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
// delete category ---> /api/categories/:id
exports.deleteCategories = async (req, res) => {
  // check if category id is provided
  if (!req.params.id)
    return res
      .status(400)
      .send({ success: false, message: "Please provide a category id" });
  try {
    // get category from db
    const category = await Category.findById(req.params.id);
    if (!category)
      return res
        .status(404)
        .send({ success: false, message: "Category not found" });
    // delete old photo  from cloudinary
    await cloudinary.v2.uploader.destroy(category.photo.id);
    // delete category from db
    await category.remove();
    res.status(200).send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
