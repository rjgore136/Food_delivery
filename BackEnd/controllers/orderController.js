import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv"
import {razorpay} from "../server.js";
dotenv.config();  

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  const { userId, items, amount, address } = req.body;
  try {
    const newOrder = new orderModel({
      userId: userId,
      item: items,
      amount: amount,
      address: address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const conversionRate = 56.27;
    const totalAmountInPaise = Math.round(amount * 100 * conversionRate);

    const options = {
      amount: totalAmountInPaise,
      currency: "INR",
      receipt: `receipt_${newOrder._id}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({ success: true, orderId: order.id });
  } catch (error) {
    res.json({ success: false, message: error });
  }  
};

export { placeOrder };
