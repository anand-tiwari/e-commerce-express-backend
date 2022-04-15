const Wishlist = require("../model/wishlist");
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;
  if (!productId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a product ID" });

  try {
    const wishlist = await Wishlist.findOne({
      product: productId,
      user: req.userId,
    });
    if (wishlist)
      return res
        .status(400)
        .send({ success: false, error: "Product already in wishlist" });

    const newWishlist = await Wishlist.create({
      user: req.userId,
      product: productId,
    });

    res.status(201).send({ success: true, wishlist: newWishlist });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getWishlistsByUserId = async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ user: req.userId }).populate(
      "product"
    );
    if (!wishlists || wishlists.length === 0)
      return res
        .status(404)
        .send({ success: false, error: "No product found in your wishlist" });

    res.status(200).send({ success: true, wishlists });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deleteItemFromWishlist = async (req, res) => {
  const { productId } = req.params;
  try {
    const wishlist = await Wishlist.findOneAndDelete({
      user: req.userId,
      product: productId,
    });
    if (!wishlist)
     return res
        .status(400)
        .send({ success: false, message: "Product not found in wishlist" });
    res.status(200).send({ success: true, wishlist });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
