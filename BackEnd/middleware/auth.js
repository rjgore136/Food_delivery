import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not authorized!! Login again!"});
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRETE);
        // console.log("token_decode "+token_decode);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        return res.json({success:false,message:error});
    }
}

export default authMiddleware;