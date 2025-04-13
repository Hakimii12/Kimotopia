import React, { useState } from 'react';
import { FiSettings, FiMessageSquare, FiLogOut, FiUser, FiEdit, FiMoreVertical } from 'react-icons/fi';
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
  const [showDropdown, setShowDropdown] = useState(false);

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
      <div className="relative h-40 bg-gradient-to-r from-purple-500 to-blue-600">
        <div className="absolute -bottom-12 left-4 flex items-end">
          <img 
            src={profile} 
            className="rounded-full border-4 border-white dark:border-gray-900 w-24 h-24 object-cover shadow-lg" 
            alt="Profile"
          />
          <div className={`ml-3 mb-1 ${dark ? 'text-white' : 'text-black'}`}>
            <div className="flex items-center">
              <h1 className="text-xl font-bold truncate max-w-[150px]">Mark Zuckerberg</h1>
              <RiVerifiedBadgeFill className="ml-1 text-blue-400 text-lg" />
            </div>
            <p className={dark ? 'text-white/90 text-sm' : 'text-black/90 text-sm'}>@zuckerberg</p>
          </div>
        </div>
      </div>

      {/* Profile Actions - Mobile Optimized */}
      <div className="flex justify-end px-4 mt-2 space-x-2">
        <button 
          onClick={() => navigate('/messages')}
          className={`p-2 rounded-full ${dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          title="Messages"
        >
          <FiMessageSquare size={18} />
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className={`p-2 rounded-full ${dark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            title="More options"
          >
            <FiMoreVertical size={18} />
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
                  navigate('/settings');
                  setShowDropdown(false);
                }}
                className={`block px-4 py-2 text-sm w-full text-left ${dark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <div className="flex items-center">
                  <FiSettings className="mr-2" size={14} />
                  Settings
                </div>
              </button>
              <button
                onClick={() => {
                  navigate('/profile');
                  setShowDropdown(false);
                }}
                className={`block px-4 py-2 text-sm w-full text-left ${dark ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <div className="flex items-center">
                  <FiUser className="mr-2" size={14} />
                  View Profile
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
      </div>

      {/* Profile Info */}
      <div className="px-4 mt-14 mb-4">
        <p className={`${dark ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
          Building the future of connection at Meta. Passionate about technology, entrepreneurship, and philanthropy.
        </p>
        
        <div className="flex mt-3 space-x-4 overflow-x-auto py-2">
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
      </div>

      {/* Dynamic Tabs */}
      <div className="flex border-b" style={{ borderColor: dark ? '#374151' : '#e5e7eb' }}>
        <button
          onClick={toggleThreads}
          className={`flex-1 py-3 font-medium relative ${threads ? (dark ? 'text-white' : 'text-blue-600') : (dark ? 'text-gray-400' : 'text-gray-500')}`}
        >
          Timeline
          {threads && (
            <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-1 rounded-full ${dark ? 'bg-blue-500' : 'bg-blue-600'}`}></span>
          )}
        </button>
        
        <button
          onClick={toggleReplies}
          className={`flex-1 py-3 font-medium relative ${!threads ? (dark ? 'text-white' : 'text-blue-600') : (dark ? 'text-gray-400' : 'text-gray-500')}`}
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