import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Token from '../utlis/jwtAndCookies.js'
import cloudinary from "../database/Cloudinary.js";
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
           return res.status(409).json({message:"user already exists"})
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
        return res.status(200).json({message:"successfully created new user",
            user: {
                id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                createdAt: newUser.createdAt
            }}) 
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
        return res.status(200).json({message:"successfully logged in",
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
        }})

    } catch (error) {
        res.status(500).json({message:error.message})  
    }
}
export function logout(req,res){
    try {
 res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/', 
});
return res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export async function followUnfollow(req,res){
    try {
      const  {id}=req.params
      const userToBeFollowed=await User.findById(id)
      const userToFollow=await User.findById(req.user._id)
     if(id===req.user._id.toString()){
        return res.status(400).json({message:"you cannot follow or unfollow yourself"})
     }
     if(!userToBeFollowed || !userToFollow){
        return res.status(400).json({message:"user not found"})
     }
         const isFollowing=userToFollow.following.includes(id)
    if(isFollowing){
        await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}})
        await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}})
        res.status(200).json({message:"unfollowed"})
    }else{
        await User.findByIdAndUpdate(req.user._id,{$push:{following:id}})
        await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}})
        res.status(200).json({message:"followed"})
    }
      
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
}
export async function update(req,res){
    try {
       
           const {name,username,password,bio,email}=req.body
           const user=await User.findById(req.user._id)
            if(req.params.id!==req.user._id.toString()){
                return res.status(400).json({messsage:"you cannot update other profile"})
            }
            if(!user){
                return res.status(404).json({message:"user not found"})
            }
            if(password){
                const salt =await bcrypt.genSalt(10);
                const hashedPassword=await bcrypt.hash(password,salt)
                user.password=hashedPassword
            }
            if(req.file){
                const result =await cloudinary.uploader.upload(req.file.path)
                if (user.profilepic) {
                    const oldPublicId = user.profilepic.split('/').slice(-2).join('/').split
                    await cloudinary.uploader.destroy(oldPublicId);
                }
                user.profilepic = result.secure_url
            }else{
                user.profilepic=user.profilepic
            }
            user.name=name || user.name
            user.username=username || user.username
            user.bio=bio || user.bio
            user.email =email || user.email
            await user.save()
            res.status(200).json({message:`successfully updated`,user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
        }})
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
    
}
export async function getUser(req,res){
    const {username}=req.params
    const user=await User.findOne({ username: username }).select("-password")
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json(user)
}
export async function GetAllUser(req,res){
    const user=await User.find({}).select("-password")
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json(user)
}
export async function getUserId(req,res){
    const {id}=req.params
    const user=await User.findById(id).select("-password")
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    return res.status(200).json(user)
    
}