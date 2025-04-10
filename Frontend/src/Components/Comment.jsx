import React, { useContext, useState, memo } from 'react';
import { FiMoreHorizontal, FiHeart, FiMessageCircle, FiRepeat, FiShare2 } from 'react-icons/fi';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { ContextProvider } from '../../ContextApi/ContextApi';

const Comment = memo(({ 
  author = 'markzukerberg', 
  text = 'Lorem ipsum, dolor sit amet consectetur.', 
  timestamp = '1d', 
  likes = 801,
  isVerified = true,
  profileImage,
  onLike,
  onReply,
  onShare
}) => {
  const { dark } = useContext(ContextProvider);
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  const [showOptions, setShowOptions] = useState(false);
  
  // Dynamic theme classes
  const theme = {
    text: dark ? 'text-gray-100' : 'text-gray-800',
    secondaryText: dark ? 'text-gray-400' : 'text-gray-500',
    icon: dark ? 'text-gray-300' : 'text-gray-600',
    border: dark ? 'border-gray-700' : 'border-gray-300',
    bg: dark ? 'bg-gray-900' : 'bg-white',
    hoverBg: dark ? 'hover:bg-gray-800' : 'hover:bg-gray-100',
    activeBg: dark ? 'bg-gray-800' : 'bg-gray-100'
  };

  const handleLike = (e) => {
    e.preventDefault();
    const newLikeStatus = !isLiked;
    setIsLiked(newLikeStatus);
    setLocalLikes(prev => newLikeStatus ? prev + 1 : prev - 1);
    onLike?.(newLikeStatus);
  };

  const handleReply = (e) => {
    e.preventDefault();
    onReply?.();
  };

  const handleShare = (e) => {
    e.preventDefault();
    onShare?.();
  };

  const toggleOptions = (e) => {
    e.preventDefault();
    setShowOptions(!showOptions);
  };

  const ActionButton = ({ icon: Icon, count, onClick, active = false, activeColor = 'text-red-500' }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 p-1 rounded-lg transition-colors duration-200 ${theme.hoverBg}`}
      aria-label={Icon.name.toLowerCase()}
    >
      <Icon 
        className={`${active ? activeColor : theme.icon} ${active ? 'fill-current' : ''}`} 
        size={16} 
      />
      {count !== undefined && count > 0 && (
        <span className={`text-xs ${theme.text}`}>
          {count.toLocaleString()}
        </span>
      )}
    </button>
  );

  return (
    <div className={`w-full ${theme.bg}`}>
      <div className={`w-full border-t ${theme.border}`}></div>
      
      <div className='p-4 flex group'>
        <div className='w-10 flex flex-col items-center mr-3'>
          <img 
            src={profileImage || 'https://i.pravatar.cc/150?img=3'} 
            className='w-8 h-8 rounded-full object-cover border border-white shadow-sm' 
            alt={`${author}'s profile`}
            loading="lazy"
            width={32}
            height={32}
          />
        </div>
        
        <div className='flex-1 relative'>
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1">
              <h2 className={`font-bold text-sm ${theme.text}`}>{author}</h2>
              {isVerified && <RiVerifiedBadgeFill className="text-blue-500 w-3 h-3" />}
            </div>
            <div className='flex items-center gap-2'>
              <time dateTime={new Date().toISOString()} className={`text-xs ${theme.secondaryText}`}>
                {timestamp}
              </time>
              <button 
                onClick={toggleOptions}
                className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${theme.hoverBg}`}
                aria-label="More options"
              >
                <FiMoreHorizontal className={theme.icon} size={14} />
              </button>
            </div>
          </div>
          
          <p className={`mt-1 text-sm ${theme.text}`}>
            {text}
          </p>
          
          {/* Comment actions */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex gap-1">
              <ActionButton 
                icon={FiHeart} 
                count={localLikes} 
                onClick={handleLike}
                active={isLiked}
              />
              <ActionButton 
                icon={FiMessageCircle} 
                onClick={handleReply}
              />
            </div>
            
            <div className="flex gap-1">
              <ActionButton icon={FiRepeat} />
              <ActionButton 
                icon={FiShare2} 
                onClick={handleShare}
              />
            </div>
          </div>

          {/* Options dropdown (conditionally rendered) */}
          {showOptions && (
            <div className={`absolute right-0 top-8 mt-1 w-48 rounded-md shadow-lg ${theme.bg} ring-1 ring-black ring-opacity-5 z-10`}>
              <div className="py-1">
                <button className={`block w-full text-left px-4 py-2 text-sm ${theme.text} hover:${theme.activeBg}`}>
                  Report
                </button>
                <button className={`block w-full text-left px-4 py-2 text-sm ${theme.text} hover:${theme.activeBg}`}>
                  Copy link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

Comment.displayName = 'Comment';

export default Comment;