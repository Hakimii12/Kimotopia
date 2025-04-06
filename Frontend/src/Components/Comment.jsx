import React from 'react'
import profile from '../assets/zuck-avatar.png'
import {FaEllipsisH } from 'react-icons/fa'
import verified from "../assets/verified.png"
import {BiLike, BiComment, BiShare, BiRepost } from 'react-icons/bi'
import { ContextProvider } from '../../ContextApi/ContextApi'
import { useContext } from 'react'
function Comment() {
      const {toggleLiked,
        liked}=useContext(ContextProvider)
  return (
    <>
        <div className="w-[90%] mx-10 h-[1px] bg-gray-300"></div>
    <div className='mt-4 mb-4 mx-14 flex sm:w-[99%] w-[90%]'>
    <div className='w-[5%] flex flex-col items-center'>
      <img src={profile} className='w-full rounded-full' />
    </div>
    <div className='flex flex-col w-[90%]'>
      <div className="w-full flex h-fit justify-between">
        <div className="ml-2 flex gap-1 items-start">
          <h2 className='font-bold text-base'>markzukerberg</h2>
          <div className='flex items-center h-full'>
            <img src={verified} className='w-[15px] h-4' />
          </div>
        </div>
        <div className='mr-2 flex gap-2 items-center'>
          <p>1d</p>
          <FaEllipsisH />
        </div>
      </div>
      <p className='ml-2 sm:mt-3'>Lorem ipsum, dolor sit amet consectetur.</p>
      <div className='h-full mt-4 w-full'>
        <div className="w-[25%]  flex justify-between">
          <BiLike size={17} onClick={(e)=>toggleLiked(e)} color={liked?`red`:``}/>
          <BiComment size={16} />
          <BiRepost size={17}/>
          <BiShare size={17}/>
        </div>
        <div className='flex gap-2 mt-2 font-light text-sm'>
            <span>801 likes</span>
        </div>
      </div>
    </div>
  </div>
    </>

  )
}

export default Comment
