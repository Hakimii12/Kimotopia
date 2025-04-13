import { useState, useContext, useEffect } from 'react';
import { FiUser, FiAtSign, FiMail, FiLock, FiEdit, FiCamera } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../ContextApi/ContextApi';

const  UpdateProfileUser = () => {
  const { dark, auth, setAuth } = useContext(ContextProvider);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    bio: '',
    profilePic: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/user/me', { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUser({ ...user, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/user/update', user, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });
      toast.success('Profile updated successfully');
      setAuth({ ...auth, user: res.data.user }); // Update context
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  if (isLoading) return <div className="flex justify-center py-8">Loading...</div>;

  return (
    <div className={`min-h-screen py-8 ${dark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`max-w-md mx-auto p-6 rounded-lg shadow-lg ${dark ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Profile</h1>
        
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src={user.profilePic || '/default-avatar.png'} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
              <FiCamera size={16} />
              <input 
                type="file" 
                accept="image/*"
                onChange={handleProfilePicChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FiUser />
            </div>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${dark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Username */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FiAtSign />
            </div>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              placeholder="Username"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${dark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FiMail />
            </div>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${dark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
              <FiLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="New Password (leave blank to keep current)"
              className={`w-full pl-10 pr-10 py-2 rounded-lg border ${dark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute inset-y-0 right-0 pr-3 flex items-center ${dark ? 'text-gray-400' : 'text-gray-500'}`}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Bio */}
          <div>
            <textarea
              name="bio"
              value={user.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              rows="3"
              className={`w-full px-4 py-2 rounded-lg border ${dark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FiEdit />
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default  UpdateProfileUser;
