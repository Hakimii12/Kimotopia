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
  const { dark, isAuth } = useContext(ContextProvider)
  const location = useLocation()
  const isChatPage = location.pathname === '/message'

  return (
    <div className={`flex flex-col min-h-screen w-full ${dark ? 'bg-black' : 'bg-white'}`}>
      <div className={`flex-1 w-full ${isChatPage ? 'sm:max-w-[800px]' : 'sm:max-w-[620px]'} mx-auto px-4 py-6`}>
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
          style={{ top: '1em', right: '1em' }}
          toastStyle={{
            borderRadius: '12px',
            padding: '16px 20px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: '14px',
            fontWeight: '500',
            minHeight: '60px',
            background: 'linear-gradient(135deg, #4a6fa5, #3a5a8a)',
            color: '#fff',
          }}
          progressStyle={{
            background: 'rgba(255, 255, 255, 0.4)',
            height: '3px',
          }}
        />

        <Routes>
          <Route path='/' element={isAuth ? <Home/> : <Navigate to="/login" />}/>
          <Route path='/update' element={isAuth ? <UpdateProfile/> : <Navigate to="/login" />}/>
          <Route path='/login' element={<Authentication/>}/>
          <Route path='/message' element={isAuth ? <ChatPage/> : <Navigate to="/login" />}/>
          <Route path='/post' element={isAuth ? <CreatePost/> : <Navigate to="/login" />}/>
          <Route path='/signUp' element={<Authentication/>}/>
          <Route path='/:username' element={isAuth ? <UserPage /> : <Navigate to="/login"/>} />
          <Route path='/:username/post/:pId' element={isAuth ? <PostPage/> : <Navigate to="/login"/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App