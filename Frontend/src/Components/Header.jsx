import React from 'react';
import Mylogo from "../assets/Mylogo.jpg";
import { useContext } from 'react';
import { ContextProvider } from '../../ContextApi/ContextApi';
import { FiSun, FiMoon } from 'react-icons/fi';

function Header() {
  const { dark, toggleLight, toggleDark } = useContext(ContextProvider);

  return (
    <div className={`
      ${dark ? 'bg-gray-900' : 'bg-white'} 
      flex items-center justify-between 
      px-6 py-4
      shadow-lg
      ${dark ? 'shadow-gray-900/30' : 'shadow-gray-200/50'}
      backdrop-blur-sm
      bg-opacity-80
      sticky top-0 z-50
      border-b
      ${dark ? 'border-gray-800' : 'border-gray-100'}
      transition-all duration-300 ease-in-out
    `}>
      <div className="flex items-center space-x-3">
        <img 
          src={Mylogo} 
          className={`
            rounded-full 
            w-12 h-12
            object-cover
            border-2
            ${dark ? 'border-gray-700' : 'border-gray-200'}
            shadow-md
            hover:scale-105
            transition-transform duration-200
            cursor-pointer
          `}
          alt="App Logo"
        />
        <h1 className={`
          text-xl font-bold
          bg-gradient-to-r
          ${dark ? 'from-blue-400 to-purple-500' : 'from-blue-600 to-purple-700'}
          bg-clip-text text-transparent
          hidden sm:block
        `}>
          MyApp
        </h1>
      </div>

      <button 
        onClick={dark ? toggleLight : toggleDark}
        className={`
          p-3 
          rounded-full
          ${dark ? 'hover:bg-gray-800/60 bg-gray-800/30' : 'hover:bg-gray-100/60 bg-gray-100/30'}
          shadow-sm
          ${dark ? 'shadow-gray-800' : 'shadow-gray-200'}
          transition-all duration-300
          group
          relative
          overflow-hidden
        `}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {dark ? (
          <FiSun 
            className='
              text-amber-300 
              group-hover:text-amber-200
              transition-colors duration-300
            ' 
            size={24}
          />
        ) : (
          <FiMoon 
            className='
              text-indigo-600
              group-hover:text-indigo-700
              transition-colors duration-300
            ' 
            size={24}
          />
        )}
        <span className={`
          absolute inset-0
          ${dark ? 'bg-amber-400/10' : 'bg-indigo-400/10'}
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-300
          rounded-full
          scale-0
          group-hover:scale-100
          transition-transform duration-500
        `}></span>
      </button>
    </div>
  );
}

export default Header;