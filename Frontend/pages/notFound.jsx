import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../ContextApi/ContextApi';
import { motion } from 'framer-motion';

function NotFound() {
  const { dark } = useContext(ContextProvider);
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Gradient backgrounds for dark/light mode
  const backgroundStyle = dark 
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`flex flex-col items-center justify-center min-h-screen p-6 ${backgroundStyle} text-center`}
    >
      <motion.div 
        variants={itemVariants}
        className="mb-8 relative"
      >
        <div className={`absolute -inset-4 rounded-lg ${dark ? 'bg-blue-900/20' : 'bg-blue-200/30'} blur-lg`}></div>
        <div className={`relative p-8 rounded-xl ${dark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm border ${dark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600"
            whileHover={{ scale: 1.02 }}
          >
            404
          </motion.h1>
          <motion.h2 
            className="text-2xl md:text-3xl font-semibold mb-2"
            variants={itemVariants}
          >
            User Not Found
          </motion.h2>
          <motion.p 
            className="text-lg mb-6 text-gray-500 dark:text-gray-400"
            variants={itemVariants}
          >
            this user doesn't exist or may have been removed
          </motion.p>
        </div>
      </motion.div>

      <motion.button
        onClick={() => navigate('/')}
        variants={itemVariants}
        whileHover={{ 
          scale: 1.05,
          boxShadow: dark 
            ? '0 8px 25px -5px rgba(37, 99, 235, 0.3)' 
            : '0 8px 25px -5px rgba(59, 130, 246, 0.3)'
        }}
        whileTap={{ scale: 0.98 }}
        className={`relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
          dark 
            ? 'bg-blue-600 hover:bg-blue-700 text-white' 
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        } shadow-lg`}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Go back home
        </span>
        <span className={`absolute inset-0 ${
          dark ? 'bg-blue-700/30' : 'bg-blue-600/30'
        } opacity-0 hover:opacity-100 transition-opacity duration-300`}></span>
      </motion.button>

      <motion.div 
        variants={itemVariants}
        className="mt-12 text-sm text-gray-500 dark:text-gray-400"
      >
        <p>Need help? <span className={`cursor-pointer ${dark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>Contact support</span></p>
      </motion.div>
    </motion.div>
  );
}

export default NotFound;