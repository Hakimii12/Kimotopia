import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../assets/zuck-avatar.png'
function UserPost() {
  return (
    <Link className='w-full h-full border-2 border-white' to={"/markzukerberg/post/1"}>
      <div className='w-[50px] border-2 border-white'>
         <img src={profile} className='w-full rounded-full' />
         <div className="h-[400px] w-[1px] bg-gray-300 ml-2"></div>
      </div>
    </Link>
  )

}
export default UserPost
