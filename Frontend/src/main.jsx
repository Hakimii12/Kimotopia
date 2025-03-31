import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })
createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={thema}>
    <App />
  </ChakraProvider>,
)
