import React from 'react'
import profile from "../assets/zuck-avatar.png"
import { BsInstagram } from 'react-icons/bs'
import { FaEllipsis } from 'react-icons/fa6'
function UserHeader() {
  return (
    <> <div className={`w-full flex justify-between items-center`}>
      <div className='flex flex-col ml-2 '>
        <h2 className='font-extrabold text-2xl'>Mark Zuckerberg</h2>
        <div className='flex gap-2'>
            <p>Zuckerberg</p>
            <p className='font-extralight text-gray-500'>threads.net</p>
        </div>
      </div>
         <img src={profile} className="rounded-full w-fit h-[95px] mr-2" alt="Profile Image" />
    </div>
    <div className='ml-2 mt-6'>
        <p className='text-lg'>Co-founder,excutive chairman and CEO of meta platforms</p>
        <div className='flex mt-5  justify-between items-center'>
             <div className='flex  gap-1 font-extralight text-gray-500'>
            <p>3.2k followers</p>
            <span>•</span>
            <p>instagram</p>
        </div>
        <div className='flex gap-2 mr-2 '>
             <BsInstagram/>
             <FaEllipsis/>
        </div>
        </div>
       
    </div>
    </>
   
  )
}

export default UserHeader
