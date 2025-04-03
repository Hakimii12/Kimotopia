import ContextApi from '../ContextApi/ContextApi'
import { Provider } from "@/components/ui/provider"
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <ContextApi>
    <BrowserRouter>  
    <Provider>
      <App/>
    </Provider>
    </BrowserRouter>
  </ContextApi>
)
