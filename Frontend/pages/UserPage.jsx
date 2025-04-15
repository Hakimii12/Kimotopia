import UserHeader from '@/Components/UserHeader';
import UserPost from '@/Components/UserPost';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ContextProvider } from '../ContextApi/ContextApi';

function UserPage() {
  const { dark } = useContext(ContextProvider);
  const { username } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Start with true since we load immediately
  const [userNotFound, setUserNotFound] = useState(false);
  const [data,setData]=useState(null)
  async function fetchUserData() {
    try {
      setIsLoading(true);
      setUserNotFound(false);
      const res = await axios.get(`http://localhost:4000/api/user/profile/${username}`, { 
        withCredentials: true,
        validateStatus: (status) => status < 500 // Resolve for all status codes less than 500
      });
       setData(res.data)
      if (res.status === 404) {
        setUserNotFound(true);
        return;
      }

      if (res.status !== 200) {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      setUserNotFound(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [username]); // Add username to dependency array to refetch when it changes

  if (isLoading) {
    return (
      <div className={`flex justify-center items-center min-h-screen ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (userNotFound) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <p className="mb-6">The username @{username} doesn't exist</p>
        <button 
          onClick={() => navigate('/')}
          className={`px-4 py-2 rounded-lg ${dark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          Go back home
        </button>
      </div>
    );
  }
  return (
    <>
      <div>
        <UserHeader data={data}/>
      </div>
      <div className='ml-2 mt-6'>
        <UserPost />
        <UserPost />
        <UserPost />
        <UserPost />
      </div>
    </>
  );
}

export default UserPage;