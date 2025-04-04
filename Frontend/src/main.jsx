import ContextApi from '../ContextApi/ContextApi'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <ContextApi>
    <BrowserRouter>  
      <App/>
    </BrowserRouter>
  </ContextApi>
)
