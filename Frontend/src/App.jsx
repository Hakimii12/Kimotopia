import { useContext } from 'react'
import { ContextProvider } from '../ContextApi/ContextApi'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import UserPage from '../pages/UserPage'
import PostPage from '../pages/PostPage'
import Header from './Components/Header'
import Authentication from '../pages/authentication'
import {toast,ToastContainer} from 'react-toastify'
import Home from '../pages/Home'
import UpdateProfile from '../pages/UpdateProfile'
import CreatePost from './Components/CreatePost'
import ChatPage from '../pages/ChatPage'
function App() {
  const { dark,isAuth,} = useContext(ContextProvider)
  const location =useLocation()
  const isChatPage = location.pathname === '/message';
  console.log(location)
  return (
    <div
      className={
        dark
          ? `bg-black flex flex-col justify-start items-center w-full min-h-screen`
          : `bg-white flex flex-col justify-start items-center w-full min-h-screen`
      }
    >
      <div
        className={isChatPage?`sm:max-w-[800px] max-w-full w-full px-4 py-6 overflow-hidden`:`sm:max-w-[620px] w-full px-4 py-6  max-w-full overflow-hidden`}
        style={{
          WebkitTextSizeAdjust: '100%',
          MozTextSizeAdjust: '100%',
          msTextSizeAdjust: '100%',
        }}
      >
      
        <Header />
        <ToastContainer
              position="top-right"
              autoClose={3000}
              limit={3}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              style={{
                // Container positioning
                top: '1em',
                right: '1em',
              }}
              toastStyle={{
                // All toast styles
                borderRadius: '12px',
                padding: '16px 20px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: '14px',
                fontWeight: '500',
                minHeight: '60px',
                // Default background (will be overridden by theme colors)
                background: 'linear-gradient(135deg, #4a6fa5, #3a5a8a)',
                color: '#fff',
              }}
              progressStyle={{
                background: 'rgba(255, 255, 255, 0.4)',
                height: '3px',
              }}
              bodyStyle={{
                margin: '0',
                padding: '0',
              }}
  />
        <Routes>
          <Route path='/' element={isAuth?<Home/>:<Navigate to="/login" />}/>
          <Route path='/update' element={isAuth?<UpdateProfile/>:<Navigate to="/login" />}/>
          <Route path='/login' element={<Authentication/>}/>
          <Route path='/message' element={<ChatPage/>}/>
          <Route path='/post' element={isAuth?<CreatePost/>:<Navigate to="/login" />}/>
          <Route path='/signUp' element={<Authentication/>}/>
          <Route path='/:username' element={isAuth? <UserPage /> : <Navigate to="/login"/>} />
          <Route path='/:username/post/:pId' element={isAuth? <PostPage/> : <Navigate to="/login"/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App