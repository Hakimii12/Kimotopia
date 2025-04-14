import User from '../models/userModel.js'
import jwt from "jsonwebtoken"
async function Authorization(req,res,next){
  console.log(req)
      try {
        const token=req.cookies.jwt;
        if(!token) return res.status(401).json({message:"Unauthorized"});
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user =await User.findById(decoded.userId).select("-password");
        if(!user) return res.status(401).json({message:"Unauthorized"})
        req.user=user;
        next();
      } catch (error) {
        res.status(500).json({message:error.message});
      }
}
export default Authorization