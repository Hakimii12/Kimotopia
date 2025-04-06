import React from 'react'
import { Link } from 'react-router-dom'
import profile from '../assets/zuck-avatar.png'
import { FaEllipsisH } from 'react-icons/fa'
import verified from "../assets/verified.png"
import post1 from '../assets/post1.png'
import { BiLike, BiComment, BiShare, BiRepost } from 'react-icons/bi'

function UserPost() {
  return (
    <Link className='flex w-full' to={"/markzukerberg/post/1"}>
      <div className='w-[10%] flex flex-col items-center'>
        <img src={profile} className='w-full rounded-full' />
        <div className="h-full w-[1px] bg-gray-300"></div> {/* Changed h-[300px] to h-full */}
        <div className='gap-1 grid grid-cols-2 ml-4'>
          <img src={profile} className='w-full rounded-full' />
          <img src={profile} className='w-full rounded-full' />
          <img src={profile} className='w-full rounded-full' />
        </div>
      </div>
      <div className='flex flex-col w-[90%]'>
        <div className="w-full flex h-fit justify-between">
          <div className="ml-2 flex gap-1 items-start">
            <h2 className='font-bold text-lg'>markzukerberg</h2>
            <div className='flex items-center h-full'>
              <img src={verified} className='w-[15px] h-4' />
            </div>
          </div>
          <div className='mr-2 flex gap-2 items-center'>
            <p>1d</p>
            <FaEllipsisH />
          </div>
        </div>
        <p className='ml-2 sm:mt-3'>let's talk about threads.</p>
        <div className='h-full mt-4 w-full'>
          <img className='h-[72%] w-[80%] rounded-lg' src={post1} alt="" />
          <div className="w-[25%] mt-2 flex justify-between">
            <BiLike/>
            <BiComment />
            <BiRepost />
            <BiShare />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default UserPost
