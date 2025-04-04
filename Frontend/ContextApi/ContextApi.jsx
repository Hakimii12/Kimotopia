import { createContext } from "react";
export const ContextProvider=createContext()
import React from 'react'
function ContextApi({children}) {
   
  return (
    <ContextProvider.Provider value={{}}>
        {children}
    </ContextProvider.Provider>

  )
}

export default ContextApi
