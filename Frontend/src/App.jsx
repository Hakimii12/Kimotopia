import { useContext } from 'react'
import { ContextProvider } from '../ContextApi/ContextApi'
import { Route,Routes } from 'react-router-dom'
import UserPage from '../pages/UserPage'
import PostPage from '../pages/PostPage'
import Header from './Components/Header'
function App() {
  const {dark}=useContext(ContextProvider)
  return (
    <div className={dark? `bg-black flex justify-center items-center w-screen min-h-screen`
      :` bg-white flex justify-center items-center w-screen min-h-screen `
    }>
      <div className={`sm:max-w-[620px] w-[500px] sm:w-full min-h-[100vh]`}>
        <Header/>
      <Routes>
         <Route path='/:username' element={<UserPage/>}/>
         <Route path='/:username/post/:pid' element={<PostPage/>}/>
       </Routes>
       </div>
    </div>
  )
}

export default App
