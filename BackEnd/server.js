import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config(); 

//app config  
const app = new express();
const port = process.env.PORT || 4000;  
  
//middlewares 
app.use(express.json());  
app.use(cors()); 
  
//db connection
connectDb();
  
//api end points
app.use("/api/food",foodRouter);
app.use("/api/user/",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/images",express.static('uploads'));//with this we can access files from uploads folder at /images enpoint
app.use("/api/order",orderRouter);
   
//new instance of razorpay
export const razorpay = new Razorpay({ 
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
    
app.get("/",(req,res)=>{
    res.send("API Working..");
})  

app.listen(port , ()=>{
    console.log(`listening on http://localhost:${port}`);
})

// mongodb+srv://joyboy136:joyboy@fooddel.ngwuagu.mongodb.net/?