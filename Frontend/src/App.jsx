import { useContext } from 'react'
import { ContextProvider } from '../ContextApi/ContextApi'
import { Route,Routes } from 'react-router-dom'
import UserPage from '../pages/UserPage'
import PostPage from '../pages/PostPage'
import Header from './Components/Header'
function App() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="max-w-[620px] w-full h-[100vh] bg-black">
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
