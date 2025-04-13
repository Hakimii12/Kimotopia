import React from 'react';
import { FiSettings, FiMessageSquare, FiBookmark, FiLogOut, FiUser, FiEdit } from 'react-icons/fi';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { useContext } from 'react';
import { ContextProvider } from '../../ContextApi/ContextApi';
import profile from "../assets/zuck-avatar.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserHeader() {
  const { dark, toggleThreads, toggleReplies, threads, setAuth } = useContext(ContextProvider);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout', {}, { withCredentials: true });
      setAuth(null);
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className={`${dark ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-50 to-white'} pb-1 mb-4 overflow-hidden`}>
      {/* Cover Photo + Profile */}
      <div className="relative h-40 sm:h-48 bg-gradient-to-r from-purple-500 to-blue-600">
        <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-6 flex items-end">
          <img 
            src={profile} 
            className="rounded-full border-4 border-white dark:border-gray-900 w-24 h-24 sm:w-32 sm:h-32 object-cover shadow-lg" 
            alt="Profile"
          />
          <div className={`ml-3 sm:ml-4 mb-1 sm:mb-2 ${dark ? 'text-white' : 'text-black'}`}>
            <div className="flex items-center">
              <h1 className="text-xl sm:text-2xl font-bold truncate max-w-[150px] sm:max-w-none">Mark Zuckerberg</h1>
              <RiVerifiedBadgeFill className="ml-1 text-blue-400 text-lg sm:text-xl" />
            </div>
            <p className={dark ? 'text-white/90 text-sm' : 'text-black/90 text-sm'}>@zuckerberg</p>
          </div>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="flex justify-end px-4 sm:px-6 mt-2 space-x-3">
        <button 
          onClick={() => navigate('/messages')}
          className={`p-2 rounded-full ${dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          title="Messages"
        >
          <FiMessageSquare size={18} />
        </button>
        
        <button 
          onClick={() => navigate('/profile/edit')}
          className={`p-2 rounded-full ${dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          title="Edit Profile"
        >
          <FiEdit size={18} />
        </button>
        
        <button 
          onClick={() => navigate('/settings')}
          className={`p-2 rounded-full ${dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          title="Settings"
        >
          <FiSettings size={18} />
        </button>
        
        <button 
          onClick={handleLogout}
          className={`p-2 rounded-full ${dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          title="Logout"
        >
          <FiLogOut size={18} />
        </button>
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 mt-14 sm:mt-16 mb-4">
        <p className={`${dark ? 'text-gray-300' : 'text-gray-700'} text-sm sm:text-base`}>
          Building the future of connection at Meta. Passionate about technology, entrepreneurship, and philanthropy.
        </p>
        
        <div className="flex mt-3 sm:mt-4 space-x-4 sm:space-x-6 overflow-x-auto py-2">
          <div className="flex-shrink-0">
            <span className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>1,234</span>
            <span className={`${dark ? 'text-gray-400' : 'text-gray-500'} ml-1`}>Posts</span>
          </div>
          <div className="flex-shrink-0">
            <span className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>5.6M</span>
            <span className={`${dark ? 'text-gray-400' : 'text-gray-500'} ml-1`}>Followers</span>
          </div>
          <div className="flex-shrink-0">
            <span className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>128</span>
            <span className={`${dark ? 'text-gray-400' : 'text-gray-500'} ml-1`}>Following</span>
          </div>
        </div>

        {/* Update Profile Button (Mobile) */}
        <button
          onClick={() => navigate('/profile/edit')}
          className={`sm:hidden w-full mt-4 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${dark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          <FiEdit size={16} />
          Update Profile
        </button>
      </div>

      {/* Dynamic Tabs */}
      <div className="flex border-b" style={{ borderColor: dark ? '#374151' : '#e5e7eb' }}>
        <button
          onClick={toggleThreads}
          className={`flex-1 py-3 sm:py-4 font-medium relative ${threads ? (dark ? 'text-white' : 'text-blue-600') : (dark ? 'text-gray-400' : 'text-gray-500')}`}
        >
          Timeline
          {threads && (
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 rounded-full ${dark ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          )}
        </button>
        
        <button
          onClick={toggleReplies}
          className={`flex-1 py-3 sm:py-4 font-medium relative ${!threads ? (dark ? 'text-white' : 'text-blue-600') : (dark ? 'text-gray-400' : 'text-gray-500')}`}
        >
          Highlights
          {!threads && (
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 rounded-full ${dark ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          )}
        </button>
      </div>
    </div>
  );
}

export default UserHeader;