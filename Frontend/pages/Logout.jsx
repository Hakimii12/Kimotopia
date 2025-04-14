import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiLogOut } from 'react-icons/fi';
import { useContext } from 'react';
import { ContextProvider } from '../ContextApi/ContextApi';
const Logout = () => {
  const { dark,setIsAuth} = useContext(ContextProvider)
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Send POST request to logout endpoint
      await axios.post('http://localhost:4000/api/user/logout', {}, {
        withCredentials: true,
      });
      // Clear frontend storage
      localStorage.removeItem("user-threads");
      sessionStorage.clear(); // Clear all session storage
      setIsAuth(false)
      // Show success message
      toast.success('Logged out successfully');

      // Redirect to login page after a brief delay
      setTimeout(() => navigate('/login'), 1000);
      
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error(error.response?.data?.message || 'Logout failed. Please try again.');
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      <FiLogOut className="text-lg" />
    </button>
  );
};

export default Logout;