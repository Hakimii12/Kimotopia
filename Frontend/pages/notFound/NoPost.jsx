import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { ContextProvider } from '../../ContextApi/ContextApi';

function NoPost() {
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
            No Posts Yet
          </motion.h1>
          <motion.p 
            className="text-lg mb-6 text-gray-500 dark:text-gray-400"
            variants={itemVariants}
          >
            Follow to see their future posts in your feed
          </motion.p>
        </div>
      </motion.div>


      <motion.div 
        variants={itemVariants}
        className="mt-12 text-sm text-gray-500 dark:text-gray-400"
      >
        <p>Need help? <span className={`cursor-pointer ${dark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}>Contact support</span></p>
      </motion.div>
    </motion.div>
  );
}

export default NoPost;