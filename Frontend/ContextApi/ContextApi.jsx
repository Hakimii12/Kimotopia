import { createContext, useEffect } from "react";
export const ContextProvider=createContext()
import React from 'react'
import { useState } from "react";
function ContextApi({children}) {
  const [dark,setDark]=useState(false)
  const [threads,setThreads]=useState(true)
  const [liked,setLiked]=useState(false)
  const [auth,setAuth]=useState('login')
  const [isAuth,setIsAuth]=useState(
    () => {
      const user = localStorage.getItem("user-threads");
      return !!user;
    }
  )
  function toggleDark(){
    setDark(true);
  }
  function toggleLight(){
    setDark(false)
  }
  function toggleThreads(){
    setThreads(true)
  }
  function toggleReplies(){
    setThreads(false)
  }
  function toggleLiked(e){
    e.preventDefault();
    e.stopPropagation(); // Prevents the click event from propagating to the parent <Link>
    setLiked(!liked);
  }
  const data={
    dark,setDark,
    toggleLight,
    toggleDark,
    toggleThreads,
    toggleReplies,
    threads,
    toggleLiked,
    liked,
    auth,setAuth,
    isAuth,setIsAuth
  }
  return (
    <ContextProvider.Provider value={data}>
        {children}
    </ContextProvider.Provider>

  )
}

export default ContextApi
