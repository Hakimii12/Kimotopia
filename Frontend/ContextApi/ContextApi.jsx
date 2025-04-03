import { extendTheme } from "@chakra-ui/theme-utils";
import { createContext } from "react";
export const ContextProvider=createContext()
import React from 'react'
function ContextApi({children}) {
   const styles={
        global:(props)=>{
            return{
                body:{
                    color:mode('gray.800', 'whiteAlpha.900')(props),
                    bg:mode('gray.100', '#101010')(props),
                }
            }
        }
   }
   const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  }
  const colors = {
    gray: {
      light: '#616161',
      dark: '#1e1e1e',
    },
  }
  const theme =extendTheme({ styles, config, colors })
  console.log(theme)
  return (
    <ContextProvider.Provider value={theme}>
        {children}
    </ContextProvider.Provider>

  )
}

export default ContextApi
