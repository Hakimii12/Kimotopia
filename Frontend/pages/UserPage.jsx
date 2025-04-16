import UserHeader from '@/Components/UserHeader';
import UserPost from '@/Components/UserPost';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ContextProvider } from '../ContextApi/ContextApi';
import NotFound from './notFound';

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
      <NotFound/>
    );
  }
  return (
    <>
      <div>
        <UserHeader data={data}/>
      </div>
      <div className='ml-2 mt-6'>
        <UserPost data={data}/>
      </div>
    </>
  );
}

export default UserPage;