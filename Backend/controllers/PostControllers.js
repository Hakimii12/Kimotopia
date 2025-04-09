import Post from "../models/postModel.js"
import User from "../models/userModel.js"
export async function CreatePost(req,res){
    try {
      const {postedBy,text}=req.body
        if(!postedBy || !text){
            return res.status(400).json({message:"please poster and post text is required"})
        }
        if(text.length>500){
            return res.status(400).json({message:"post should be less than 500 characters"})
        }
        const user =await User.findById(postedBy).select("-password")
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if(user._id.toString() !==req.user._id.toString()){
            return res.status(400).json({message:"you are not authorized to post"})
        }
        const newPost =new Post({
            postedBy:postedBy,
            text:text
        })
        await newPost.save()
        res.status(200).json({message:"successfully creates post"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}
export async function GetPost(req,res) {
    try {
        const {id}=req.params
        if(!id){
            return res.status(404).json({message:"no post"})
        }
        const post=await Post.findById(id)
        if(!post){
            return res.status(404).json({message:"post not found"})
        }

        return res.status(200).json({post})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export async function DeletePost(req,res){
    try {
        const {id}=req.params
        if(!id){
            return res.status(404).json({message:"no post"})
        }
        const post=await Post.findById(id)
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        const userPost = await User.findById(post.postedBy).select("-password")
        if(!userPost){
            return res.status(404).json({message:"user not founc"})
        }
        if(userPost._id.toString() !== req.user._id.toString()){
            return res.status(400).json({message:"Unauthorized to delete this post"})
        }
        await Post.findByIdAndDelete(id)
        return res.status(200).json({message:"successfully deleted the post"})
    } catch (error) {
        res.status(500).json({message:error.message}) 
    }
}