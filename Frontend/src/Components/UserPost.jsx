import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../assets/zuck-avatar.png'
function UserPost() {
  return (
    <Link className=' w-full h-full' to={"/markzukerberg/post/1"}>
      <div className='w-[9%]'>
         <img src={profile} className='w-full rounded-full' />
         <div className="h-[300px] w-[1px] bg-gray-300 ml-2"></div>
         <div className='w-[50%] gap-1 grid grid-cols-2'>
            <img src={profile} className='w-full rounded-full' />
         <img src={profile} className='w-full rounded-full' />
         <img src={profile} className='w-full rounded-full' />
         </div>
       
      </div>
    </Link>
  )

}
export default UserPost
