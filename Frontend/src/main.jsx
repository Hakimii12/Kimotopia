import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { chakraProvider } from '@chakra-ui/react'
import { Provider } from "@/components/ui/provider"
createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>,
)
