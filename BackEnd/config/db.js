import mongoose from "mongoose";

export const connectDb = async () =>{
    await mongoose.connect(`${process.env.connString}`).then(()=>console.log("DB connection successfull!"));
}

