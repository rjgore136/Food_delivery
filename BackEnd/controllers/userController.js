import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//fucntion to create jwt token using sign method
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRETE);
  };  


//login
const login = async (req, res) => {
    const {email,password} = req.body;
    try { 
        //check if the user with entered email exists or not 
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user doesn't exists!!"});
        }

        //comparing user entered password and password stored in db using compare method of bcrypt
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid crendentials!!"});
        }

        const token = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:`${error}`});
    }
};


  
//registration
const register = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //check if email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "user already exists!!" });
    }

    //validating email using validator
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email!!" });
    }

    //validating the password lengeth
    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password!!" });
    }

    //hashing the password using bycrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: `Something went wrong!!${error}` });
  }
};

export { login, register };
