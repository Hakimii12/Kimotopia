import React, { useState } from 'react';
import { 
  FiMoreHorizontal, 
  FiHeart, 
  FiMessageCircle, 
  FiRepeat, 
  FiShare2 
} from 'react-icons/fi';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

const Comment = ({
  author = 'markzukerberg',
  text = 'This is a sample comment text.',
  timestamp = '1d',
  likes = 0,
  isVerified = false,
  profileImage = 'https://i.pravatar.cc/150?img=3',
  darkMode = false
}) => {
  // State for tracking likes and dropdown
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showDropdown, setShowDropdown] = useState(false);

  // Colors for dark/light mode
  const colors = {
    text: darkMode ? 'text-white' : 'text-black',
    secondaryText: darkMode ? 'text-gray-400' : 'text-gray-500',
    icon: darkMode ? 'text-gray-300' : 'text-gray-600',
    background: darkMode ? 'bg-gray-900' : 'bg-white',
    hover: darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
  };

  // Handle like button click
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Action button component
  const ActionButton = ({ icon: Icon, count, onClick, active = false }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 p-2 rounded-full ${colors.hover}`}
    >
      <Icon 
        className={`${active ? 'text-red-500 fill-current' : colors.icon}`} 
        size={18}
      />
      {count > 0 && <span className={`text-xs ${colors.text}`}>{count}</span>}
    </button>
  );

  return (
    <div className={`w-full ${colors.background} p-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="flex">
        {/* Profile picture */}
        <div className="mr-3">
          <img
            src={profileImage}
            className="w-10 h-10 rounded-full object-cover border"
            alt={`${author}'s profile`}
          />
        </div>

        {/* Comment content */}
        <div className="flex-1">
          {/* Comment header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <span className={`font-bold ${colors.text}`}>{author}</span>
              {isVerified && <RiVerifiedBadgeFill className="text-blue-500" size={14} />}
              <span className={`text-xs ${colors.secondaryText}`}>{timestamp}</span>
            </div>
            
            {/* More options button */}
            <button 
              onClick={toggleDropdown}
              className={`p-1 rounded-full ${colors.hover}`}
            >
              <FiMoreHorizontal className={colors.icon} size={16} />
            </button>
          </div>

          {/* Comment text */}
          <p className={`mt-1 ${colors.text}`}>{text}</p>

          {/* Comment actions */}
          <div className="flex justify-between mt-2">
            <div className="flex gap-2">
              <ActionButton 
                icon={FiHeart} 
                count={likeCount} 
                onClick={handleLike}
                active={isLiked}
              />
              <ActionButton icon={FiMessageCircle} />
            </div>
            
            <div className="flex gap-2">
              <ActionButton icon={FiRepeat} />
              <ActionButton icon={FiShare2} />
            </div>
          </div>

          {/* Dropdown menu */}
          {showDropdown && (
            <div className={`absolute right-4 mt-1 w-40 rounded-md shadow-lg ${colors.background} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <button className={`w-full text-left px-4 py-2 text-sm ${colors.text} ${colors.hover}`}>
                Report
              </button>
              <button className={`w-full text-left px-4 py-2 text-sm ${colors.text} ${colors.hover}`}>
                Copy link
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;