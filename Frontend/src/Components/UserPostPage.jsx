import React from 'react'
import profile from '../assets/zuck-avatar.png'
import {FaEllipsisH } from 'react-icons/fa'
import verified from "../assets/verified.png"
import post1 from '../assets/post1.png'
import {BiLike, BiComment, BiShare, BiRepost } from 'react-icons/bi'
import { ContextProvider } from '../../ContextApi/ContextApi'
import { useContext } from 'react'
import Comment from './Comment'
function UserPostPage() {
    const {toggleLiked,
        liked}=useContext(ContextProvider)
  return (
    <div className='mt-6 flex flex-col w-full'>
    <div className='mt-6 flex w-full'>
    <div className='w-[10%] flex flex-col items-center'>
      <img src={profile} className='w-full rounded-full' />
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
      <p className='ml-2 sm:mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos modi quisquam ab excepturi harum iure recusandae natus quos voluptates consequuntur ex, corporis corrupti, illum possimus voluptatibus amet. Temporibus, maiores alias.</p>
      <div className='h-full mt-4 w-full'>
        <img className='h-[72%] w-[80%] rounded-lg' src={post1} alt="" />
        <div className="w-[25%] mt-4 flex justify-between">
          <BiLike size={20} onClick={(e)=>toggleLiked(e)} color={liked?`red`:``}/>
          <BiComment size={19} />
          <BiRepost size={20}/>
          <BiShare size={20}/>
        </div>
        <div className='flex gap-2 mt-4 font-light text-sm'>
            <span>338 replies</span>
            <span>&bull;</span>
            <span>801 likes</span>
        </div>
      </div>
    </div> 
  </div>
  <div className='w-full h-full'>
    <div className=" mx-14 h-[1px] w-full bg-gray-300"></div>
    <div className=" h-[100px] flex justify-between items-center">
      <p className="mx-14 text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-md">
        👋🏼 Get the app to like, post & comment
      </p> 
      <button className="px-6 py-2 font-bold text-white bg-gray-700 border-2 border-purple-400 rounded-lg shadow-lg transition-all duration-300 hover:shadow-purple-500/50 hover:text-purple-300 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-600" >Get</button>
    </div>
    <div className=" mx-14 h-[1px] w-full bg-gray-300"></div>
  </div>
  <Comment/>
  <Comment/>
  <Comment/>
  <Comment/>
  <Comment/>
  <Comment/>
  <div className=" mx-14 h-[1px] w-full bg-gray-300"></div>
    </div>
    
  )
}

export default UserPostPage
