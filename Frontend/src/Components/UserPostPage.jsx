import React from 'react';
import profile from '../assets/zuck-avatar.png';
import verified from "../assets/verified.png";
import post1 from '../assets/post1.png';
import { ContextProvider } from '../../ContextApi/ContextApi';
import { useContext } from 'react';
import Comment from './Comment';
import { FiMoreHorizontal, FiHeart, FiMessageCircle, FiRepeat, FiShare2 } from 'react-icons/fi';
function UserPostPage() {
    const { toggleLiked, dark, liked } = useContext(ContextProvider);

    // Dynamic color classes
    const textColor = dark ? 'text-gray-100' : 'text-gray-800';
    const secondaryTextColor = dark ? 'text-gray-400' : 'text-gray-500';
    const iconColor = dark ? 'text-gray-300' : 'text-gray-600';
    const borderColor = dark ? 'border-gray-700' : 'border-gray-300';

    return (
        <div className={`${dark ? 'bg-gray-900' : 'bg-white'} flex flex-col w-full sm:text-base text-xs`}>
            {/* Post Content */}
            <div className='p-5'>
                <div className='flex w-full'>
                    <div className='w-[10%] flex flex-col items-center'>
                        <img src={profile} className='w-12 h-12 rounded-full object-cover border-2 border-white shadow-md' alt="Profile" />
                    </div>
                    <div className='flex flex-col w-[90%] pl-3'>
                        <div className="w-full flex h-fit justify-between">
                            <div className="flex items-center gap-2">
                                <h2 className={`font-bold text-lg ${textColor}`}>markzukerberg</h2>
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
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos modi quisquam ab excepturi harum iure recusandae natus quos voluptates consequuntur ex, corporis corrupti, illum possimus voluptatibus amet. Temporibus, maiores alias.
                        </p>
                        <div className='mt-4 w-full'>
                            <img className='w-full max-h-96 rounded-xl object-cover' src={post1} alt="Post content" />
                            
                            {/* Horizontal action bar - matching UserPost component */}
                            <div className="flex justify-between items-center mt-4 px-2">
                                <div className="flex gap-1">
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleLiked(e);
                                        }}
                                        className={`flex items-center gap-1 p-2 rounded-lg ${liked ? 'text-red-500' : iconColor} ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                                    >
                                        <FiHeart className={liked ? 'fill-current' : ''} size={20} />
                                        <span className={`text-sm ${textColor}`}>801</span>
                                    </button>
                                    <button className={`flex items-center gap-1 p-2 rounded-lg ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                                        <FiMessageCircle size={20} className={iconColor} />
                                        <span className={`text-sm ${textColor}`}>338</span>
                                    </button>
                                </div>

                                <div className="flex gap-1">
                                    <button className={`p-2 rounded-lg ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                                        <FiRepeat size={20} className={iconColor} />
                                    </button>
                                    <button className={`p-2 rounded-lg ${dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                                        <FiShare2 size={20} className={iconColor} />
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

            {/* Comments Section */}
            <div className="px-5 pb-5">
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </div>
        </div>
    );
}

export default UserPostPage;