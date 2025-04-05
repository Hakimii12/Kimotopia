import React from 'react'
import logo from "../assets/light-logo.svg"
import { useContext } from 'react'
import { ContextProvider } from '../../ContextApi/ContextApi'
function Header() {
  const {dark,setDark,
    toggleLight}=useContext(ContextProvider)
    console.log(dark)
  return (
    <div className='flex items-center justify-center mt-6'>
      <img onClick={toggleLight} src={logo} width={20}  />
    </div>
  )
}

export default Header
