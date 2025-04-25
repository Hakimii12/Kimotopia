import Conversation from "../models/Conversation.js";

export async function CreateMessage(req,res){
    const {particepant,text}=req.body;
    const sendId=req.user_id;
    try {
        const conversation= await Conversation.findOne({ participants: { $all: [sendId, particepant] } });
        if(!conversation){
            const newConversation=new Conversation({
                particepants:[sendId,particepant]
            });
            await newConversation.save();
        }
        
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error.message)
    }

}

