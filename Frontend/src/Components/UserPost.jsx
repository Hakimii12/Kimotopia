import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMoreHorizontal, FiHeart, FiMessageCircle, FiRepeat, FiShare2 } from 'react-icons/fi';
import { ContextProvider } from '../../ContextApi/ContextApi';
import { useContext } from 'react';
import profile from '../assets/zuck-avatar.png';
import verified from "../assets/verified.png";
import axios from 'axios';
import Loading from './Loading/Loading';
import { toast } from 'react-toastify';


function UserPost(params) {
  const user = JSON.parse(localStorage.getItem("user-threads"));
  const currentUserId = user.id;
  const { data } = params;
  const userId = data._id;
  const { toggleLiked, liked, dark } = useContext(ContextProvider);
  const [isLoading, setIsLoading] = useState(true);
  const [postNotFound, setPostNotFound] = useState(false);
  const [postData, setPostData] = useState([]);

  async function postLike(id) {
    try {
      const res = await axios.post(
        `http://localhost:4000/api/post/like&dislike/${id}`,
        { currentUserId },
        { withCredentials: true }
      );
      MyPost(); // Refresh posts after like/dislike
      return res;
    } catch (error) {
      toast.error("Failed to like post");
    }
  }

  async function MyPost() {
    try {
      setIsLoading(true);
      setPostNotFound(false);
      const res = await axios.get(
        `http://localhost:4000/api/post/getpostpostedBy/${userId}`,
        { 
          withCredentials: true,
          validateStatus: (status) => status < 500
        }
      );
      
      if (res.status === 404) {
        setPostNotFound(true);
        return;
      }
      
      if (res.status === 200) {
        setPostData(res.data);
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      toast.error("No posts found");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    MyPost();
  }, [userId]);

  // Dynamic theme classes
  const theme = {
    bg: dark ? 'bg-gray-900' : 'bg-white',
    text: dark ? 'text-gray-100' : 'text-gray-800',
    secondaryText: dark ? 'text-gray-400' : 'text-gray-500',
    icon: dark ? 'text-gray-300' : 'text-gray-600',
    hoverBg: dark ? 'hover:bg-gray-800/60' : 'hover:bg-gray-100/60',
    border: dark ? 'border-gray-700' : 'border-gray-200',
    card: dark ? 'bg-gray-800/30' : 'bg-gray-50/50',
    accent: dark ? 'text-blue-400' : 'text-blue-500'
  };

  if (isLoading) return <Loading />;
  if (postNotFound) return <div className={`p-4 ${theme.text}`}>No posts found</div>;

  return (
    postData?.map((post, index) => (
      <div key={index} className="block transition-transform duration-300 hover:scale-[1.01] active:scale-[0.99]">
        <div className={`
          ${theme.bg}
          p-5 mb-6 rounded-2xl
          shadow-xl
          ${dark ? 'shadow-gray-900/30' : 'shadow-gray-200/20'}
          backdrop-blur-sm
          border
          ${theme.border}
          transition-all duration-300
        `}>
          {/* Author header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="relative group">
              <img 
                src={data.profilepic || profile} 
                className={`
                  w-12 h-12 rounded-full object-cover
                  border-2 ${theme.border}
                  shadow-md
                  transition-all duration-300
                  group-hover:scale-110
                `}
                alt="Profile"
              />
              <div className={`
                absolute inset-0 rounded-full
                bg-gradient-to-r from-blue-500 to-purple-600
                opacity-0 group-hover:opacity-20
                transition-opacity duration-300
                -z-10
              `}></div>
            </div>
  
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h3 className={`font-bold text-lg ${theme.text} hover:underline`}>{data.name}</h3>
                  <img src={verified} className="w-4 h-4" alt="Verified" />
                  <span className={`text-sm ${theme.secondaryText}`}>1d</span>
                </div>
                <button className={`
                  p-2 rounded-full
                  ${theme.hoverBg}
                  transition-colors duration-200
                `}>
                  <FiMoreHorizontal className={theme.icon} />
                </button>
              </div>
  
              {/* Post content */}
              <div className="sm:text-base text-sm mt-3 mb-5">
                <p className={`leading-relaxed ${theme.text}`}>
                    {post.text}
                </p>
              </div>
            </div>
          </div>
  
          {/* Featured image */}
          {post?.image && (
            <div className={`
              relative mb-5 rounded-xl overflow-hidden
              shadow-lg
              transition-all duration-500
              hover:shadow-xl
              ${dark ? 'hover:shadow-gray-800/30' : 'hover:shadow-gray-300/30'}
            `}>
              <img 
                src={post.image} 
                className={`
                  w-full h-auto max-h-96 object-cover
                  transition-transform duration-700 ease-in-out
                  hover:scale-105
                `}
                alt="Post content"
              />
              <div className={`
                absolute inset-0 bg-gradient-to-t
                ${dark ? 'from-gray-900/40 to-gray-900/10' : 'from-white/20 to-white/5'}
                pointer-events-none
              `}></div>
            </div>
          )}
  
          {/* Horizontal action bar */}
          <div className="flex justify-between items-center px-2">
            <div className="flex gap-1">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  toggleLiked(e);
                  postLike(post._id);
                }}
                className={`
                  flex items-center gap-1 p-2 rounded-lg
                  ${post.like.includes(currentUserId) ? 'text-red-500' : theme.icon}
                  ${theme.hoverBg}
                  transition-colors duration-200
                  relative overflow-hidden
                `}
              >
                <FiHeart className={post.like.includes(currentUserId) ? 'fill-current' : ''} size={20} />
                <span className={`text-sm ${theme.text}`}>{post.like.length}</span>
                {post.like.includes(currentUserId) && (
                  <div className={`
                    absolute inset-0 rounded-full
                    bg-red-500/10
                    pointer-events-none
                  `}></div>
                )}
              </button>
              <Link to={`/${data.username}/post/${post._id}`} className={`
                flex items-center gap-1 p-2 rounded-lg
                ${theme.hoverBg}
                transition-colors duration-200
              `}>
                <FiMessageCircle size={20} className={theme.icon} />
                <span className={`text-sm ${theme.text}`}>{post.comment.length}</span>
              </Link>
            </div>
  
            <div className="flex gap-1">
              <button className={`
                p-2 rounded-lg
                ${theme.hoverBg}
                transition-colors duration-200
              `}>
                <FiRepeat size={20} className={theme.icon} />
              </button>
              <button className={`
                p-2 rounded-lg
                ${theme.hoverBg}
                transition-colors duration-200
              `}>
                <FiShare2 size={20} className={theme.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    ))
  );
}
export default UserPost;