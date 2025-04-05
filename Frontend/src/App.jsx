import { useContext } from 'react'
import { ContextProvider } from '../ContextApi/ContextApi'
import { Route,Routes } from 'react-router-dom'
import UserPage from '../pages/UserPage'
import PostPage from '../pages/PostPage'
import Header from './Components/Header'
function App() {
  const {dark}=useContext(ContextProvider)
  return (
    <div className={dark? `flex justify-center items-center w-screen h-screen bg-black`
      :`flex justify-center items-center w-screen h-screen bg-white `
    }>
      <div className="max-w-[620px] w-full h-[100vh]">
        <Header/>
      <Routes>
         <Route path='/' element={<UserPage/>}/>
         <Route path='/:username/post/:pid' element={<PostPage/>}/>
       </Routes>
       </div>
    </div>
    
    
  )
}

export default App
