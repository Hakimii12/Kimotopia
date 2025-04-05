import { createContext } from "react";
export const ContextProvider=createContext()
import React from 'react'
import { useState } from "react";
function ContextApi({children}) {
  const [dark,setDark]=useState(false)
  const [threads,setThreads]=useState(true)
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
  const data={
    dark,setDark,
    toggleLight,
    toggleDark,
    toggleThreads,
    toggleReplies,
    threads
  }
  return (
    <ContextProvider.Provider value={data}>
        {children}
    </ContextProvider.Provider>

  )
}

export default ContextApi
