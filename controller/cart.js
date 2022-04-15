const Cart = require("../model/cart");
const user = require("../model/user");

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  if (!productId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a product ID" });

  try {
    const cart = await Cart.findOne({ product: productId, user: req.userId });
    if (cart) {
      cart.quantity = cart.quantity + 1;
      const newCart = await cart.save();
      return res.status(200).send({ success: true, cart: newCart });
    }

    const newCart = await Cart.create({
      user: req.userId,
      product: productId,
    });

    res.status(201).send({ success: true, cart: newCart });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getCartsByUserId = async (req, res) => {
  try {
    const carts = await Cart.find({ user: req.userId }).populate("product");
    if (!carts || carts.length === 0)
      return res
        .status(404)
        .send({ success: false, error: "No product found in your cart" });

    res.status(200).send({ success: true, carts });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getCarts = async (req, res) => {
  try {
    const cartItems = await Cart.find().populate("product");
    if (!cartItems || cartItems.length === 0)
      return res
        .status(404)
        .send({ success: false, error: "No product found in cart" });

    res.status(200).send({ success: true, carts: cartItems });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.decCartItemQuantity = async (req, res) => {
  const { productId } = req.body;
  if (!productId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a product ID" });

  try {
    const cart = await Cart.findOne({ product: productId, user: req.userId });
    if (!cart)
      return res
        .status(404)
        .send({ success: false, error: "Product not found in your cart" });
    cart.quantity = cart.quantity - 1;
    const newCart = await cart.save();

    /* const cart = await Cart.findOneAndUpdate(
      { product: productId, user: req.userId },
      {
        $inc: {
          quantity: -1,
        },
      },
      { new: true }
    );
    */
    return res.status(200).send({ success: true, cart: newCart });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.incCartItemQuantity = async (req, res) => {
  const { productId } = req.body;
  if (!productId)
    return res
      .status(400)
      .send({ success: false, error: "Provide a product ID" });

  try { 
    const cart = await Cart.findOneAndUpdate(
      { product: productId, user: req.userId },
      {
        $inc: {
          quantity: 1,
        },
      },
      { new: true }
    );
    res.status(200).send({ success: true, cart });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.deleteItemFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOneAndDelete({
      user: req.userId,
      product: productId,
    });
    res.status(200).send({ success: true, cart });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};
