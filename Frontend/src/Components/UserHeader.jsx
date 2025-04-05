import React from 'react'
import profile from "../assets/zuck-avatar.png"
import { BsInstagram } from 'react-icons/bs'
import { FaEllipsis } from 'react-icons/fa6'
import { useContext } from 'react'
import { ContextProvider } from '../../ContextApi/ContextApi'

function UserHeader() {
  const { dark, toggleThreads, toggleReplies, threads } = useContext(ContextProvider)

  return (
    <>
      <div className={dark ? "w-full flex justify-between items-center text-white" : "w-full flex justify-between items-center"}>
        <div className="flex flex-col ml-2">
          <h2 className="font-extrabold text-2xl">Mark Zuckerberg</h2>
          <div className="flex gap-2">
            <p>Zuckerberg</p>
            <p className={dark ? "font-extralight text-gray-400" : "font-extralight text-gray-500"}>threads.net</p>
          </div>
        </div>
        <img src={profile} className="rounded-full w-fit h-[95px] mr-2" alt="Profile Image" />
      </div>

      <div className="ml-2 mt-6">
        <p className={dark ? "text-white text-lg" : "text-lg"}>Co-founder, executive chairman and CEO of Meta Platforms</p>
        <div className="flex mt-5 justify-between items-center">
          <div className={dark ? "flex gap-1 font-extralight text-gray-400" : "flex gap-1 font-extralight text-gray-500"}>
            <p>3.2k followers</p>
            <span>•</span>
            <p>Instagram</p>
          </div>
          <div className={dark ? "text-white flex gap-2 mr-2" : "flex gap-2 mr-2"}>
            <BsInstagram />
            <FaEllipsis />
          </div>
        </div>
      </div>

      <div className={dark ? "w-full text-white flex justify-around" : "w-full flex justify-around"}>
        <div
          className={`text-center w-[50%] ${
            threads
              ? dark
                ? "border-b-4 border-white"
                : "border-b-4 border-black"
              : dark
              ? "border-b-2 border-gray-500"
              : "border-b-2 border-gray-200"
          }`}
        >
          <h3 onClick={toggleThreads}>Threads</h3>
        </div>
        <div
          className={`text-center w-[50%] ${
            !threads
              ? dark
                ? "border-b-4 border-white"
                : "border-b-4 border-black"
              : dark
              ? "border-b-2 border-gray-500"
              : "border-b-2 border-gray-200"
          }`}
        >
          <h3 onClick={toggleReplies}>Replies</h3>
        </div>
      </div>
    </>
  )
}

export default UserHeader
