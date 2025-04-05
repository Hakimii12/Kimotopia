import React from 'react'
import lightLogo from "../assets/light-logo.svg"
import darkLogo from "../assets/dark-logo.svg"
import { useContext } from 'react'
import { ContextProvider } from '../../ContextApi/ContextApi'
function Header() {
  const {dark,toggleLight,toggleDark}=useContext(ContextProvider)
    console.log(dark)
  return (
    <div className='flex items-center justify-center mt-6'>
      {dark?<img onClick={toggleLight}  src={lightLogo} width={20}/>
      :<img onClick={toggleDark} src={darkLogo}  width={20}  />}
    </div>
  )
}

export default Header
