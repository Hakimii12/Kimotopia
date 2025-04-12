import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  // Debug localStorage changes
    window.addEventListener('storage', (e) => {
      console.log('localStorage changed:', e);
    });
  const handleLogout = async () => {
    try {
      // Send POST request to logout endpoint
      await axios.post('http://localhost:4000/api/user/logout', {}, {
        withCredentials: true, // Include cookies (for JWT/HTTP-only cookies)
      });
      // Clear frontend storage (if using localStorage/sessionStorage)
      console.log(localStorage)
      console.log(sessionStorage)
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('tempData');

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Log Out
    </button>
  );
};

export default Logout
