import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
export async function signUp(req,res) {
    try {
        const {name,username,email,password}=req.body
        if(!name || !username || !email || !password){
             return res.status(400).json({message:"please fill all the fields"})
        }
        const user=await User.findOne({
         $or:[
             {email:email},
             {username:username}
         ]
        });
        if(user){
           return res.status(400).json({message:"user already exists"})
        }
        const salt =await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt)
        const newUser=new User({
            name:name,
            username:username,
            email:email,
            password:hashedPassword
        })
        await newUser.save()
        return res.status(200).json({message:"successfully created new user"}) 
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
   
}