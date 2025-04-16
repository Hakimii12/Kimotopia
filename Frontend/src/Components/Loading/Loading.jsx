import React, { useContext } from 'react'
import { ContextProvider } from '../../../ContextApi/ContextApi';
function Loading() {
    const { dark } = useContext(ContextProvider);
  return(
    <div className={`flex flex-col justify-center items-center min-h-[50vh] gap-4 transition-all duration-300 ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Animated gradient spinner */}
      <div className="relative w-16 h-16">
        <div className={`absolute inset-0 rounded-full border-4 border-t-transparent ${dark ? 'border-gray-700' : 'border-gray-200'}`}></div>
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
        <div className="absolute inset-1 rounded-full border-4 border-t-transparent border-blue-400 animate-spin animation-delay-200"></div>
      </div>
      
      {/* Text with fade-in animation */}
      <div className="flex flex-col items-center gap-2">
        <p className={`text-lg font-medium ${dark ? 'text-gray-300' : 'text-gray-700'} animate-pulse`}>Loading posts</p>
        
        {/* Animated dots */}
        <div className="flex space-x-1">
          <div className={`w-2 h-2 rounded-full ${dark ? 'bg-blue-400' : 'bg-blue-500'} animate-bounce`} style={{ animationDelay: '0ms' }}></div>
          <div className={`w-2 h-2 rounded-full ${dark ? 'bg-blue-400' : 'bg-blue-500'} animate-bounce`} style={{ animationDelay: '150ms' }}></div>
          <div className={`w-2 h-2 rounded-full ${dark ? 'bg-blue-400' : 'bg-blue-500'} animate-bounce`} style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
      
      {/* Subtle progress bar at bottom */}
      <div className={`w-full max-w-xs h-1 mt-6 rounded-full overflow-hidden ${dark ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <div className={`h-full bg-gradient-to-r from-blue-500 to-blue-400 animate-progress`}></div>
      </div>
    </div>
  )
}

export default Loading
