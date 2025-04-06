import { useContext } from 'react'
import { ContextProvider } from '../ContextApi/ContextApi'
import { Route, Routes } from 'react-router-dom'
import UserPage from '../pages/UserPage'
import PostPage from '../pages/PostPage'
import Header from './Components/Header'

function App() {
  const { dark } = useContext(ContextProvider)
  return (
    <div
      className={
        dark
          ? `bg-black flex flex-col justify-start items-center w-full min-h-screen`
          : `bg-white flex flex-col justify-start items-center w-full min-h-screen`
      }
    >
      <div
        className={`sm:max-w-[620px] w-full px-4 py-6  max-w-full overflow-hidden`}
        style={{
          WebkitTextSizeAdjust: '100%',
          MozTextSizeAdjust: '100%',
          msTextSizeAdjust: '100%',
        }}
      >
        <Header />
        <Routes>
          <Route path='/:username' element={<UserPage />} />
          <Route path='/:username/post/:pid' element={<PostPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App