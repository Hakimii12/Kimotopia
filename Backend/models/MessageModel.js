import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    conversationId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Conversation"  
    },
    sender:{
       type:mongoose.Types.ObjectId,ref:"User"
    },
    text:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const messages=mongoose.model("Messages",messageSchema)