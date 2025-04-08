import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Token from '../utlis/jwtAndCookies.js'
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
        Token(newUser._id,res)
        await newUser.save()
        return res.status(200).json({message:"successfully created new user"}) 
    } catch (error) {
       res.status(500).json({message:error.message}) 
    }
   
}
export async function login(req,res){
    try {
        const {username,password}=req.body
        if(!username||!password){
            res.status(400).json({message:"please fill all the fields"})
        }
        const user=await User.findOne({
            username:username
        })
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"invalid credentials"})
        }
        Token(user._id,res)
        return res.status(200).json({message:"successfully logged in"})

    } catch (error) {
        res.status(500).json({message:error.message})  
    }
}
export function logout(req,res){
    try {
        res.clearCookie('jwt',{expires:new Date(0)})
        return res.status(200).json({message:"successfully logged out"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}