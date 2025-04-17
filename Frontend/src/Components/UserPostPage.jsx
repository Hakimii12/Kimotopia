import React, { useState, useEffect, useContext, use } from 'react';
import verified from "../assets/verified.png";
import { ContextProvider } from '../../ContextApi/ContextApi';
import Comment from './Comment';
import { FiMoreHorizontal, FiHeart, FiMessageCircle,FiMeh, FiArrowLeft } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import defaultAvatar from '../assets/default-avatar.png';
import { toast } from 'react-toastify';
import Loading from './Loading/Loading';
import { RiDeleteBin2Line, RiDeleteBin4Fill, RiSendPlaneFill } from 'react-icons/ri';
function UserPostPage() {
    const { username, pId } = useParams();
    const user = JSON.parse(localStorage.getItem("user-threads"));
    const currentUserId = user.id;
    const currentusername=user.username
    const navigate = useNavigate();
    const { dark } = useContext(ContextProvider);
    
    // Dynamic color classes
    const textColor = dark ? 'text-gray-100' : 'text-gray-800';
    const secondaryTextColor = dark ? 'text-gray-400' : 'text-gray-500';
    const iconColor = dark ? 'text-gray-300' : 'text-gray-600';
    const borderColor = dark ? 'border-gray-700' : 'border-gray-300';
    
    const [postData, setPostData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [noPost, setNoPost] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [currentuser,setcurrentuser]=useState(null)
    async function CurrentUser(){
        const currentuser = await axios.get(
            `http://localhost:4000/api/user/profile/${currentusername}`,
            { withCredentials: true }
        );
        setcurrentuser(currentuser?.data)
    }
    async function DeletePost(){
        try {
            const res= await axios.delete(
                `http://localhost:4000/api/post/deletepost/${pId}`,
                { withCredentials: true }
            )
            toast("post deleted")
            navigate(-1)
        } catch (error) {
           console.log(error) 
        }
        
    }
    async function postLiked(id) {
        try {
            const res = await axios.post(
                `http://localhost:4000/api/post/like&dislike/${id}`,
                { currentUserId },
                { withCredentials: true }
            );
            postedUser(); // Refresh posts after like/dislike
            return res;  
        } catch (error) {
            toast.error("Failed to like post");
        }
    }

    async function postedUser() {
        try {
            setIsLoading(true);
            const resuser = await axios.get(
                `http://localhost:4000/api/user/profile/${username}`,
                { withCredentials: true }
            );
            const respost = await axios.get(
                `http://localhost:4000/api/post/getpost/${pId}`,
                { withCredentials: true }
            );
            setPostData(respost?.data.post);
            setUserData(resuser?.data);
        } catch (error) {
            console.log(error);
            setNoPost(true);
        } finally {
            setIsLoading(false);
        }
    }

    const handlePostReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        try {
            await axios.post(
                `http://localhost:4000/api/post/reply/${pId}`,
                { text: replyText },
                { withCredentials: true }
            );
            setReplyText('');
            setIsReplying(false);
            postedUser(); // Refresh the post to show new comment
            toast.success("Reply posted successfully");
        } catch (error) {
            toast.error("Failed to post reply");
            console.error(error);
        }
    };

    useEffect(() => {
        postedUser();
        CurrentUser()
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    if (postData?.postedBy?.toString() != userData?._id?.toString() || noPost) {
        return (
            <div className={`flex flex-col items-center justify-center min-h-[60vh] px-4 text-center transition-all duration-300 ${dark ? 'bg-gray-900' : 'bg-white'}`}>
                <div className={`p-6 rounded-full mb-4 ${dark ? 'bg-gray-800' : 'bg-gray-100'} animate-bounce`}>
                    <FiMeh className={`text-4xl ${dark ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <h3 className={`text-xl font-medium mb-2 ${dark ? 'text-gray-100' : 'text-gray-800'}`}>
                    No posts found
                </h3>
                <p className={`max-w-md mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    It looks quiet here. Try another page or come back later.
                </p>
                <button 
                    onClick={() => navigate(-1)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                >
                    <FiArrowLeft />
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className={`${dark ? 'bg-gray-900' : 'bg-white'} flex flex-col w-full sm:text-base text-xs`}>
            {/* Post Content */}
            <div className='p-5'>
                <div className='flex w-full'>
                    <div className='w-[10%] flex flex-col items-center'>
                        <img 
                            src={userData?.profilepic || defaultAvatar} 
                            className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md'
                            alt="Profile"
                        />
                    </div>
                    <div className='flex flex-col w-[90%] pl-3'>
                        <div className="w-full flex h-fit justify-between">
                            <div className="flex items-center gap-2">
                                <h2 className={`font-bold text-lg ${textColor}`}>{userData?.name}</h2>
                                <img src={verified} className='w-4 h-4' alt="Verified" />
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className={`text-sm ${secondaryTextColor}`}>1d</span>
                                <button className={`p-2 rounded-full ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                                    <FiMoreHorizontal className={iconColor} />
                                </button>
                            </div>
                        </div>
                        <p className={`mt-3 ${textColor}`}>
                            {postData?.text}
                        </p>
                        <div className='mt-4 w-full'>
                            {postData.image && (
                                <img 
                                    className='w-full max-h-96 rounded-xl object-cover' 
                                    src={postData.image}
                                    alt="Post content"
                                />
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex justify-between items-center mt-4 px-2">
                                <div className="flex gap-1">
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            postLiked(postData._id);
                                        }}
                                        className={`flex items-center gap-1 p-2 rounded-lg ${postData?.like?.includes(currentUserId) ? 'text-red-500' : iconColor} ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                                    >
                                        <FiHeart className={postData?.like?.includes(currentUserId) ? 'fill-current' : ''} size={20} />
                                        <span className={`text-sm ${textColor}`}>{postData?.like?.length}</span>
                                    </button>
                                    <button className={`flex items-center gap-1 p-2 rounded-lg ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                                        <FiMessageCircle size={20} className={iconColor} />
                                        <span className={`text-sm ${textColor}`}>{postData?.comment?.length}</span>
                                    </button>
                                </div>

                                <div className="flex gap-1">
                                    <button className={`p-2 rounded-lg ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                                        
                                    </button>
                                    <button onClick={DeletePost} className={currentUserId==postData?.postedBy?`p-2 rounded-lg ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`:"hidden"}>
                                        <RiDeleteBin2Line size={20} className={iconColor} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Promo Banner */}
            <div className={`w-full border-t ${borderColor} px-5`}>
                <div className="flex justify-between items-center py-4">
                    <p className="text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                        👋🏼 Get the app to like, post & comment
                    </p>
                    <button className={`px-6 py-2 font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg transition-all duration-300 hover:shadow-purple-500/50 hover:brightness-110`}>
                        Get
                    </button>
                </div>
            </div>

            {/* Reply to Post Section */}
            <div className={`border-t ${borderColor} px-5 py-3`}>
                <div className="flex items-start gap-3">
                    <img 
                        src={currentuser?.profilepic || defaultAvatar} 
                        className="w-10 h-10 rounded-full object-cover border"
                        alt="Your profile"
                    />
                    <form onSubmit={handlePostReply} className="flex-1 flex flex-col gap-2">
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your reply..."
                            className={`w-full p-3 rounded-lg ${dark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                            rows={isReplying ? 3 : 1}
                            onFocus={() => setIsReplying(true)}
                        />
                        {isReplying && (
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsReplying(false);
                                        setReplyText('');
                                    }}
                                    className={`px-4 py-2 rounded-lg font-medium ${dark ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!replyText.trim()}
                                    className={`px-4 py-2 rounded-lg font-medium text-white ${dark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} disabled:opacity-50`}
                                >
                                    <RiSendPlaneFill size={18} />
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>

            {/* Comments Section */}
            <div className="px-5 pb-5">
                {postData?.comment?.length > 0 ? (
                    postData.comment.map((comment, index) => (
                        <Comment key={index} pId={pId} comment={comment} />
                    ))
                ) : (
                    <div className={`flex flex-col items-center justify-center py-10 ${dark ? 'bg-gray-900' : 'bg-white'}`}>
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-12 w-12 ${dark ? 'text-gray-500' : 'text-gray-400'}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={1.5} 
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                                />
                            </svg>
                        </div>
                        <h3 className={`text-xl font-medium mb-1 ${dark ? 'text-white' : 'text-gray-900'}`}>
                            No comments yet
                        </h3>
                        <p className={`${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                            Be the first to share what you think!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserPostPage;