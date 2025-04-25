import Conversation from "../models/Conversation.js";
import Messages from "../models/MessageModel.js";

export async function CreateMessage(req,res){
    const {particepant,message}=req.body;
    const sendId=req.user._id;
    console.log(sendId)
    try {
        let conversation= await Conversation.findOne({ participants: { $all: [sendId, particepant] } });
        if(!conversation){
               conversation=new Conversation({
                particepants:[sendId,particepant],
                lastMessage:{
                    text:message,
                    sender:sendId 
                }
            });
            await conversation.save();
        }
        const newMessage=new Messages({
            conversationId:conversation._id,
            sender:sendId,
            text:message
        })
        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage:{
                    text:message,
                    sender:sendId
                }
            })
        ])
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({message:error.message})
        console.log(error.message)
    }

}

