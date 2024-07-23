import userModel from "../models/userModel.js";

//add to cart
const addToCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });

    //check if user exists or not
    if (!userData) {
      return res.json({ success: false, message: "user not found!!" });
    }

    const cartData = userData.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    let updatedCart = await userModel.findByIdAndUpdate(
      req.body.userId,
      { cartData },
      { new: true }
    );
    // console.log(updatedCart);
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

//remove fromcart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);

    //check if user exists or not
    if (!userData) {
      return res.json({ success: false, message: "user not found!!" });
    }

    const cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    let updatedCart = await userModel.findByIdAndUpdate(
      req.body.userId,
      { cartData },
      { new: true }
    );
    // console.log(updatedCart);
    res.json({ success: true, message: "removed from cart!!" });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

//get from cartData of user from db
const getFromCart = async (req, res) => {
  try {
    const userData = await userModel.findOne({ _id: req.body.userId });
    if (!userData) {
      return res.json({ success: false, message: "user not found!!" });
    }
    const cartData = userData.cartData;
    // console.log(cartData);
    res.json({ success: true, cartData: cartData });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

export { addToCart, removeFromCart, getFromCart };
