import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        requierd:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilepic:{
        type:String,
        default:""
    },
    followers:{
        type:[String],
        default:[]
    },
    following:{
        type:[String],
        default:[]
    },
    bio:{
        type:String,
        default:""
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
}
,{
    timestamps:true
})
const User=mongoose.model("User",userSchema)
export default User