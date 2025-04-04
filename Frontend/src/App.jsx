import { useContext } from 'react'
import { ContextProvider } from '../ContextApi/ContextApi'
import { Route,Routes } from 'react-router-dom'
import UserPage from '../pages/UserPage'
import PostPage from '../pages/PostPage'
function App() {
  return (
    <div className="flex max-w-[620px] bg-black">
      <Routes>
      <Route path='/:username' element={<UserPage/>}/>
      <Route path='/:username/post/:pid' element={<PostPage/>}/>
    </Routes>
    </div>
    
  )
}

export default App
