import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { ContextProvider } from '../ContextApi/ContextApi';
import { useNavigate } from 'react-router-dom';

// Export an async function (not a component)
export const useLogout = () => {
  const { setIsAuth } = useContext(ContextProvider);
  const navigate = useNavigate();

  const logout = async () => {
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

  return logout; // Return the logout function
};