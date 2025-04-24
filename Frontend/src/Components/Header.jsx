import React from 'react';
import Mylogo from "../assets/Mylogo.jpg";
import { useContext } from 'react';
import { ContextProvider } from '../../ContextApi/ContextApi';
import { FiSun, FiMoon, FiLogOut, FiMessageSquare, FiUser } from 'react-icons/fi';
import { useLogout } from "../../pages/Logout";
import { Link } from 'react-router-dom';

function Header() {
  const { dark, toggleLight, toggleDark } = useContext(ContextProvider);
  const Logout = useLogout()
  const user = JSON.parse(localStorage.getItem("user-threads"));
  console.log(user)
  return (
    <div className={`
      ${dark ? 'bg-gray-900' : 'bg-white'} 
      flex items-center justify-between 
      px-4 sm:px-6 py-3 sm:py-4
      shadow-lg
      ${dark ? 'shadow-gray-900/30' : 'shadow-gray-200/50'}
      backdrop-blur-sm
      bg-opacity-80
      sticky top-0 z-50
      border-b
      ${dark ? 'border-gray-800' : 'border-gray-100'}
      transition-all duration-300 ease-in-out
    `}>
      {/* Logo Section */}
      <div className="flex items-center space-x-2 sm:space-x-3 flex-1">
        <img 
          src={Mylogo} 
          className={`
            rounded-full 
            w-8 h-8 sm:w-10 sm:h-10
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
          text-lg sm:text-xl font-bold
          bg-gradient-to-r
          ${dark ? 'from-blue-400 to-purple-500' : 'from-blue-600 to-purple-700'}
          bg-clip-text text-transparent
          hidden sm:block
        `}>
          Kimotopia
        </h1>
      </div>

      {/* Center Spacer */}
      <div className="flex-1 flex justify-center">
        <button 
          onClick={dark ? toggleLight : toggleDark}
          className={`
            p-2 
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
            <FiSun className='text-amber-300 group-hover:text-amber-200' size={20} />
          ) : (
            <FiMoon className='text-indigo-600 group-hover:text-indigo-700' size={20} />
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
      {/* Right Icons Section */}
      <div className="flex-1 flex justify-end items-center gap-2 sm:gap-3">
        <Link to={`/${user.username}`}
          className={`
            p-2 
            rounded-full
            ${dark ? 'hover:bg-gray-800/60 bg-gray-800/30' : 'hover:bg-gray-100/60 bg-gray-100/30'}
            shadow-sm
            ${dark ? 'shadow-gray-800' : 'shadow-gray-200'}
            transition-all duration-300
            group
            relative
            overflow-hidden
          `}
          aria-label="Profile"
        >
          <FiUser 
            className={`
              ${dark ? 'text-emerald-400 group-hover:text-emerald-300' : 'text-green-600 group-hover:text-green-700'}
              transition-colors duration-300
            `}
            size={20}
          />
          <span className={`
            absolute inset-0
            ${dark ? 'bg-emerald-400/10' : 'bg-green-400/10'}
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
            rounded-full
            scale-0
            group-hover:scale-100
            transition-transform duration-500
          `}></span>
        </Link>

        <button
          className={`
            p-2 
            rounded-full
            ${dark ? 'hover:bg-gray-800/60 bg-gray-800/30' : 'hover:bg-gray-100/60 bg-gray-100/30'}
            shadow-sm
            ${dark ? 'shadow-gray-800' : 'shadow-gray-200'}
            transition-all duration-300
            group
            relative
            overflow-hidden
          `}
          aria-label="Messages"
        >
          <FiMessageSquare 
            className={`
              ${dark ? 'text-blue-400 group-hover:text-blue-300' : 'text-indigo-600 group-hover:text-indigo-700'}
              transition-colors duration-300
            `}
            size={20}
          />
          <span className={`
            absolute inset-0
            ${dark ? 'bg-blue-400/10' : 'bg-indigo-400/10'}
            opacity-0
            group-hover:opacity-100
            transition-opacity duration-300
            rounded-full
            scale-0
            group-hover:scale-100
            transition-transform duration-500
          `}></span>
        </button>

        <button
          onClick={Logout}
          className={`
            p-2 
            rounded-full
            ${dark ? 'hover:bg-gray-800/60 bg-gray-800/30' : 'hover:bg-gray-100/60 bg-gray-100/30'}
            shadow-sm
            ${dark ? 'shadow-gray-800' : 'shadow-gray-200'}
            transition-all duration-300
            group
            relative
            overflow-hidden
          `}
          aria-label="Logout"
        > 
          <FiLogOut 
            className={`
              ${dark ? 'text-red-400 group-hover:text-red-300' : 'text-red-500 group-hover:text-red-600'}
              transition-colors duration-300
            `} 
            size={20}
          />
          <span className={`
            absolute inset-0
            ${dark ? 'bg-red-400/10' : 'bg-red-400/10'}
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
    </div>
  );
}

export default Header;