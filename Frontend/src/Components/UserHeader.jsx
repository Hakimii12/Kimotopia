import React, { useEffect, useState } from 'react';
import { 
  FiSettings, 
  FiMessageSquare, 
  FiLogOut, 
  FiUser, 
  FiEdit, 
  FiMoreVertical, 
  FiUserPlus,
  FiUserCheck 
} from 'react-icons/fi';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useContext } from 'react';
import { ContextProvider } from '../../ContextApi/ContextApi';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import defaultAvatar from '../assets/default-avatar.png';

function UserHeader(params) {
  const {data} = params;
  const id=data._id
  const {username} = useParams();
  const { dark, toggleThreads, toggleReplies, threads, setIsAuth } = useContext(ContextProvider);
  const user = JSON.parse(localStorage.getItem("user-threads"));
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(data?.followers?.includes(user?.id));
  const [followUnfullow, setfollowUnfullow] = useState(user?.id.toString() === data?._id.toString());
  const [myData, setmyData] = useState({
    followers: [],
    following: [],
    bio: '',
    name: '',
    username: '',
    profilepic: ''
  });
  async function userData() {
    try {
      setIsLoading(true);
      setmyData({
        followers: data.followers || [],
        following: data.following || [],
        bio: data.bio || '',
        name: data.name || '',
        username: data.username || '',
        profilepic: data.profilepic || defaultAvatar
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user?.username) {
      userData();
    } else {
      navigate('/login');
    }
  }, []);

  const toggleFollow = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/user/followunfollow/${id}`, {id}, {
        withCredentials: true,
      });
      
      const newFollowingStatus = !isFollowing;
      setIsFollowing(newFollowingStatus);
      
      setmyData(prev => ({
        ...prev,
        followers: newFollowingStatus 
          ? [...prev.followers, user.id]
          : prev.followers.filter(followerId => followerId !== user.id)
      }));
      
      toast.success(newFollowingStatus 
        ? `You are now following ${data.name}`
        : `You unfollowed ${data.name}`
      );
    } catch (error) {
      console.error('Follow/unfollow failed:', error);
      toast.error(error.response?.data?.message || 'Failed to update follow status');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/user/logout', {}, {
        withCredentials: true,
      });
      localStorage.removeItem("user-threads");
      sessionStorage.clear();
      setIsAuth(false);
      toast.success('Logged out successfully');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.response?.data?.message || 'Logout failed. Please try again.');
    }
  };

  if (isLoading) return (
    <div className={`flex justify-center items-center min-h-screen ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className={`${dark ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'} pb-1 mb-4 overflow-hidden`}>
      {/* Cover Photo + Profile */}
      <div className="relative h-40 bg-gradient-to-r from-purple-500 to-blue-600">
        <div className="absolute -bottom-12 left-4 flex items-end">
          <img 
            src={myData.profilepic ? myData.profilepic : defaultAvatar} 
            className="rounded-full border-4 border-white dark:border-gray-900 w-20 h-20 sm:w-24 sm:h-24 object-cover shadow-lg" 
            alt="Profile"
          />
          <div className={`ml-3 mb-1 ${dark ? 'text-white' : 'text-black'}`}>
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-bold truncate max-w-[120px] sm:max-w-[150px]">{myData.name}</h1>
              <RiVerifiedBadgeFill className="ml-1 text-blue-400 text-base sm:text-lg" />
            </div>
            <p className={dark ? 'text-white/90 text-xs sm:text-sm' : 'text-black/90 text-xs sm:text-sm'}>@{myData.username}</p>
          </div>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="flex justify-end items-center sm:px-4 pr-1 mt-2">
        <div className="flex space-x-3 min-w-[100px] justify-end">
          <button 
            onClick={() => navigate('/messages')}
            className={`p-2 rounded-full ${dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            title="Messages"
          >
            <FiMessageSquare className="text-lg" />
          </button>
          
          {followUnfullow ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className={`p-2 rounded-full ${dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                title="More options"
              >
                <FiMoreVertical className="text-lg" />
              </button>
              
              {showDropdown && (
                <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-10 ${dark ? 'bg-gray-800' : 'bg-white'} ring-1 ring-black ring-opacity-5`}>
                  <button
                    onClick={() => {
                      navigate('/update');
                      setShowDropdown(false);
                    }}
                    className={`block px-4 py-2 text-sm w-full text-left ${dark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <FiEdit className="mr-2" size={14} />
                      Update Profile
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowDropdown(false);
                    }}
                    className={`block px-4 py-2 text-sm w-full text-left ${dark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <div className="flex items-center">
                      <FiLogOut className="mr-2" size={14} />
                      Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button 
              onClick={toggleFollow}
              className={`p-2 rounded-full ${isFollowing 
                ? (dark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white')
                : (dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700')}`}
              title={isFollowing ? "Unfollow" : "Follow"}
            >
              {isFollowing ? (
                <FiUserCheck className="text-lg" />
              ) : (
                <FiUserPlus className="text-lg" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Bio and Stats */}
      <div className="px-4 mt-14 mb-4">
        <p className={`${dark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
          {myData.bio}
        </p>
        
        <div className="flex mt-3 gap-4 overflow-x-auto py-2">
          <div className="flex-shrink-0">
            <span className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>2</span>
            <span className={`${dark ? 'text-gray-400' : 'text-gray-500'} ml-1`}>Posts</span>
          </div>
          <div className="flex-shrink-0">
            <span className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{myData.followers.length}</span>
            <span className={`${dark ? 'text-gray-400' : 'text-gray-500'} ml-1`}>Followers</span>
          </div>
          <div className="flex-shrink-0">
            <span className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{myData.following.length}</span>
            <span className={`${dark ? 'text-gray-400' : 'text-gray-500'} ml-1`}>Following</span>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <h2 className='text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 bg-[length:200%] hover:bg-[length:100%] transition-all duration-500'>My Post</h2>
    </div>
  );
}

export default UserHeader;