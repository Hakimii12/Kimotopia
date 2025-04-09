import mongoose from 'mongoose'
const postSchema=new mongoose.Schema({
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        maxlength:500,
    },
    image:{
        type:String,
        
    },
    like:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
        default:[]
    },
    comment:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            text:{
               type:String,
               required:true
            },
            username:{
                type:String,
                required:true
            },
            profilepic:{
                type:String
            }
        }
    ]
},{
    timestamps:true
})
const Post =mongoose.model('Post',postSchema)
export default Post