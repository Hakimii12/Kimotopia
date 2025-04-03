import { useContext } from 'react'
import { ContextProvider } from '../ContextApi/ContextApi'
import { Route,Routes } from 'react-router-dom'
function App() {
  return (
    <Routes>
      <Route path='/:username' element={<UserPage/>}/>
      <Route path='/:username/post/:pid' element={<PostPage/>}/>

    </Routes>
  )
}

export default App
