import React, { useState, useContext } from 'react';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { ContextProvider } from '../../ContextApi/ContextApi';
import defaultAvatar from "../assets/default-avatar.png"
import { RiDeleteBin2Fill } from 'react-icons/ri';
import axios from 'axios';
function Comment(params){
  const {comment,pId}=params
  const commentId=comment._id
  const user=JSON.parse(localStorage.getItem("user-threads"))
  const currentUserId=user.id
  const { dark } = useContext(ContextProvider);
  const [deletePermition, setdeletePermition] = useState(comment.userId==currentUserId);
  async function DeleteComment(){
      try {
        const res =await axios.delete(`http://localhost:4000/api/post/deletecomment/${pId}/${commentId}`,{
          withCredentials:true
        })
        window.location.reload()
      } catch (error) {
        console.log(error)
      }
  }

  const colors = {
    text: dark ? 'text-white' : 'text-black',
    secondaryText: dark ? 'text-gray-400' : 'text-gray-500',
    icon: dark ? 'text-gray-300' : 'text-gray-600',
    background: dark ? 'bg-gray-900' : 'bg-white',
    hover: dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
    border: dark ? 'border-gray-700' : 'border-gray-200'
  };
  return (
    <div className={`w-full ${colors.background} p-4 border-b ${colors.border}`}>
      <div className="flex">
        {/* Profile picture */}
        <div className="mr-3">
          <img
            src={comment.profilepic||defaultAvatar}
            className="w-10 h-10 rounded-full object-cover border"
          />
        </div>

        {/* Comment content */}
        <div className="flex-1 relative">
          {/* Comment header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className={`font-bold ${colors.text}`}>{comment.username}</span>
              <RiVerifiedBadgeFill className="text-blue-500" size={14} />
              {/* <span className={`text-xs ${colors.secondaryText}`}>{timestamp}</span> */}
            </div>
            
            {/* More options button */}
            <button 
                onClick={DeleteComment}
              className={deletePermition?`p-1 rounded-full ${colors.hover}`:'hidden'}
            >
              <RiDeleteBin2Fill className={colors.icon} size={16} />
            </button>
          </div>

          {/* Comment text */}
          <p className={`mt-1 ${colors.text}`}>{comment.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Comment;