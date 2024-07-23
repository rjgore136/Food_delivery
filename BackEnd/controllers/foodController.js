import foodModel from "../models/foodModel.js";
import fs from "fs";

//add new food item
const addFood = async (req,res) =>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try {
        await food.save();
        res.json({success:true,message:"Food item added!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to add food item!!"});
    }
} 

//access the all the food item's  list 
const listFood = async (req,res) =>{
    try {   
        const foodItems = await foodModel.find({});
        res.json({success:true,data:foodItems});  
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Failed to load food items!!"}); 
    }
}

//remove food item from the database
const deleteFood = async (req,res) =>{
    try {
        const food = await foodModel.findById(req.body.id);
        console.log(food);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food item removed!"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }
}

export {addFood,listFood,deleteFood};  