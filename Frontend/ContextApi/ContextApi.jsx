import { createContext } from "react";
export const ContextProvider=createContext()
import React from 'react'
import { useState } from "react";
function ContextApi({children}) {
  const [dark,setDark]=useState(false)
  function toggleDark(){
    setDark(true);
  }
  function toggleLight(){
    setDark(false)
  }
  const data={
    dark,setDark,
    toggleLight,
    toggleDark
  }
  return (
    <ContextProvider.Provider value={data}>
        {children}
    </ContextProvider.Provider>

  )
}

export default ContextApi
