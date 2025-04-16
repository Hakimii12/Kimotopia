import Post from "../models/postModel.js"
import cloudinary from "../database/Cloudinary.js"
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
        async function postimage(){
            if(req.file){
                const img=await cloudinary.uploader.upload(req.file.path)
                const result=img.secure_url
                return result
            }
        }
        const postImagemage=await postimage()
        const newPost =new Post({
            postedBy:postedBy,
            text:text,
            image:postImagemage ||""
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
export async function GetpostedByPost(req,res) {
    try {
        const {postedBy}=req.params
        if(!postedBy){
            return res.status(404).json({message:"no post"})
        }
        const post=await Post.find({postedBy:postedBy})
        if(!post){
            return res.status(404).json({message:"post not found"})
        }

        return res.status(200).json(post)
        
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
export async function LikeDislikePost(req,res){
    try {
        const {id}=req.params
        if(!id){
            return res.status(404).json({message:"no post"})
        }
        const post=await Post.findById(id)
        if(!post){
            return res.status(404).json({message:"post no found"})
        }
        const userToLike=await User.findById(req.user._id).select("-password")
        if(!userToLike){
            return res.status(404).json({message:"user not found"})
        }
        const isLiked=post.like.includes(userToLike._id)
        if(isLiked){
            await Post.findByIdAndUpdate(id,{$pull:{like:userToLike._id}})
            return res.status(200).json({message:"disliked"})
        }else{
            await Post.findByIdAndUpdate(id,{$push:{like:userToLike._id}})
            return res.status(200).json({message:"liked"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
export async function Reply(req,res){
    try {
        const {id}=req.params
        const {text}=req.body
        const username=req.user.username
        const profilepic=req.user.profilepic
        const userId=req.user._id
        const userToReply=await User.findById(req.user._id).select("-password")
        const post =await Post.findById(id)
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        if(!userToReply){
            return res.status(404).json({message:"user not found"})
        }
        const reply={username,profilepic,text,userId}
        await post.comment.push(reply)
        await post.save()
        return res.status(200).json({message:`${username} replyed to your post`})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
    

}
export async function getFeedPosts(req, res) {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const following = user.following;
        
        // Return empty array if not following anyone (this is a normal case)
        if (following.length === 0) {
            return res.status(200).json([]);
        }

        const feed = await Post.find({ postedBy: { $in: following } })
            .sort({ createdAt: -1 }) // Newest first
            .limit(20); // Add pagination limit

        return res.status(200).json(feed);
    } catch (error) {
        console.error("Error in getFeedPosts:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}