import { useState, useContext, useEffect } from 'react';
import { FiUser, FiAtSign, FiMail, FiLock, FiEdit, FiCamera } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContextProvider } from '../../ContextApi/ContextApi';
import defaultAvatar from '../assets/default-avatar.png';
const UpdateProfileUser = () => {
  const { dark, auth, setAuth } = useContext(ContextProvider);
  const user = JSON.parse(localStorage.getItem("user-threads"));
  console.log(user)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profilepic, setprofilepic] = useState(null);
  const [name, setName] = useState(user?.name || '');
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
 async function prievData() {
  const res=await axios.get(`http://localhost:4000/api/user/profile/${user.username}`,
    { withCredentials: true }
  )
    setprofilepic(res.data.profilepic)
    console.log((res.data.profilepic))
 }
 useEffect(()=>{
 prievData()
 },[])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata=new FormData()
    formdata.append('profilepic',profilepic)
    formdata.append('name',name)
    formdata.append('username',username)
    formdata.append('bio',bio)
    formdata.append('email',email)
    formdata.append('password',password)
    try {
      const res = await axios.put(`http://localhost:4000/api/user/update/${user.id}`, 
        formdata, 
        {
          withCredentials: true,
          headers: {'Content-Type': 'multipart/form-data' }
        }
      );
      toast.success('Profile updated successfully');
      navigate('/profile');
    } catch (err) {
      toast.error('Update failed');
      console.error(err)
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return (
    <div className={`flex justify-center items-center min-h-screen ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className={`min-h-screen py-8 ${dark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-md mx-auto px-4">
        <div className={`rounded-xl shadow-lg overflow-hidden ${dark ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`py-4 px-6 ${dark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <h1 className="text-2xl font-bold text-center">Edit Profile</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex justify-center">
              <div className="relative group">
                <img 
                  src={profilepic ? profilepic : defaultAvatar} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 group-hover:opacity-75 transition-opacity"
                />
                <label 
                  htmlFor="image" 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <FiCamera className="text-white text-xl" />
                </label>
                <input 
                  type="file" 
                  id="image" 
                  hidden 
                  accept="image/*"
                  onChange={(e) => setprofilepic(e.target.files[0])}
                />
              </div>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="flex items-center text-sm font-medium">
                <FiUser className="mr-2" /> Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${dark ? 
                  'bg-gray-700 border-gray-600 focus:ring-blue-500' : 
                  'bg-white border-gray-300 focus:ring-blue-400'}`}
                placeholder="Enter your name"
              />
            </div>

            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="flex items-center text-sm font-medium">
                <FiAtSign className="mr-2" /> Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${dark ? 
                  'bg-gray-700 border-gray-600 focus:ring-blue-500' : 
                  'bg-white border-gray-300 focus:ring-blue-400'}`}
                placeholder="Enter username"
              />
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <label htmlFor="bio" className="flex items-center text-sm font-medium">
                <FiEdit className="mr-2" /> Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${dark ? 
                  'bg-gray-700 border-gray-600 focus:ring-blue-500' : 
                  'bg-white border-gray-300 focus:ring-blue-400'}`}
                placeholder="Tell us about yourself"
                rows="3"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center text-sm font-medium">
                <FiMail className="mr-2" /> Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${dark ? 
                  'bg-gray-700 border-gray-600 focus:ring-blue-500' : 
                  'bg-white border-gray-300 focus:ring-blue-400'}`}
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="flex items-center text-sm font-medium">
                <FiLock className="mr-2" /> New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${dark ? 
                  'bg-gray-700 border-gray-600 focus:ring-blue-500' : 
                  'bg-white border-gray-300 focus:ring-blue-400'}`}
                placeholder="Enter new password (leave blank to keep current)"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${dark ? 
                'bg-blue-600 hover:bg-blue-700 text-white' : 
                'bg-blue-500 hover:bg-blue-600 text-white'} flex items-center justify-center`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : 'Update Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileUser;